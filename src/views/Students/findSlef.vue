<template>
	<!-- 缴费 ,保修，-->
	<div>
		<!-- 表单 -->
		 <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="dorm.dormNum"
		        label="宿舍"
		        width="180">
		      </el-table-column>
			  <el-table-column
			    prop="stuNum"
			    label="学号"
			    width="180">
			  </el-table-column>
		      <el-table-column
		        prop="name"
		        label="姓名"
		        width="180">
		      </el-table-column>
			  <el-table-column
			    prop="sex"
			    label="性别"
			    width="180">
			  </el-table-column>
		      <el-table-column
		        prop="isChange"
		        label="是否改舍">
		      </el-table-column>
			  <el-table-column
			    prop="isRepaire"
			    label="维修状态">
			  </el-table-column>
			  <el-table-column fixed="right"align="center" label="操作" width="200">
				  <template slot-scope='scope'>
						<el-button  type='primary' :disabled=" userAccount==1000 ? false: scope.row.Account!=userAccount&&scope.row.isChange==true"  v-if="scope.row.isChange=='申请改舍中'" @click='ensure(1,scope.row)' size="small">撤销改舍</el-button>
						<el-button  type='primary' :disabled=" userAccount==1000 ? false:scope.row.Account!=userAccount&&scope.row.isChange==true" v-if="scope.row.isChange=='无改舍申请'" @click='applyChangeDorm(scope)' size="small">改舍</el-button>
						<el-button  type='primary' :disabled=" userAccount==1000 ? false:scope.row.Account!=userAccount&&scope.row.isRepaire==true" v-if="scope.row.isRepaire=='维修申请中'" @click='ensure(2,scope.row)' size="small"> 撤销维修 </el-button>
						<el-button  type='primary' :disabled=" userAccount==1000 ? false:scope.row.Account!=userAccount&&scope.row.isRepaire==true" v-if="scope.row.isRepaire=='无维修申请'"  @click='rePaire(scope.row)'  size="small">维修</el-button>
				  </template>
			  </el-table-column>
			  
		    </el-table> 
			<!-- 确定是否撤销申请 -->
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="30%" >
			  <span>是否确定{{enSuretitle}}</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="send">确 定</el-button>
			  </span>
			</el-dialog>
			
			<!-- 改舍申请 -->
			<el-dialog  center='center' width="30%" :visible.sync="changeVisible">
				<!-- getList接受激活事件 -->
				<change-dorm @getList='getStudentsList' ref='changeDorm'></change-dorm> 
				<span slot='footer' >
					<el-button @click="changeVisible = false">取 消</el-button>
					<el-button  type="primary" @click='submit'> 提交</el-button>
				</span>
			</el-dialog>
			 
			<!-- 维修申请 -->
			<el-dialog  center='center' width="30%"  :visible.sync="repaireVisible">
				<repaire ref="repaire" @getList='getStudentsList'></repaire>
				<span slot='footer' >
					<el-button @click="repaireVisible = false">取 消</el-button>
					<el-button  type="primary" @click='submitRepaire'> 提交</el-button>
				</span>
			</el-dialog>
	</div>
</template>

<script>
	import {
		getAllStudents,
		retractApplyChange,
		retractApllyRepaire,
		search
	} from '@/api/api.js'
	
	import changeDorm from '@/components/Students/changeDorm';
	import repaire from '@/components/Students/repaire';
	export default{
		mounted(){
			this.getStudentsList();//载入列表
		},
		
		watch:{
			
		},
		components:{
			changeDorm,
			repaire
		},
		data(){
			return{
				scope:{
					name:'',
					stuNum:''
				},//点击行的数据
				repaireVisible:false, //'维修申请'
				changeVisible:false,//改舍信息显示
				userAccount:19830,//管理员权限
				
				dialogVisible:false,
				enSuretitle:'',
				userAccount:'',
				type:1,//撤销改舍（1）或者维修（2） 
				tableData: [{
				            dorm:
							{dormNum:'10-5-9',
							isRepaire:false
							},
							Account:'1001',
				            name: '王小虎',
				            sex: '男',
							state:'正常',
							isRe:true,//是否车回改舍
							
				          },],
			}
				
		},
		methods:{
			getStudentsList(){ //获取所有学生
			this.userAccount=sessionStorage.getItem('userAccount')
			
				getAllStudents(this.userAccount).then(res =>{
					this.tableData=res.data;
					this.tableData.map(item=>{
						let arr=item;
						if(item.dorm.dormNum==''){
							arr.dorm.dormNum='暂未设置'
						}
						
						arr.isChange=item.isChange==false?'无改舍申请':'申请改舍中';
						arr.isRepaire= item.isRepaire==false?'无维修申请':'维修申请中'
						return arr
					})
				})
			},
			ensure(type,scope){ //确定撤销
				this.type=type;
				this.scope={}
				if(type==1){
					this.enSuretitle = '撤销维修申请';
					this.scope=scope;
				}
				else if(type==2){
					this.enSuretitle = '撤销维修申请';
					this.scope=scope;
					
				}
				this.dialogVisible=true
			},
			send(){ //发送撤销申请
				if(this.type==1){
					let params = {
						name:this.scope.name,
						stuNum:this.scope.stuNum,
						id:this.scope._id
					}
					retractApplyChange(params).then(res=>{
							this.getStudentsList();
					})
					
				}
				else if(this.type==2){
					let params ={
						name:this.scope.name,
						stuNum:this.scope.stuNum,
						id:this.scope._id
					};
					retractApllyRepaire(params).then(res=>{
						if(res.data.message=='撤回成功'){
							this.getStudentsList();
						}
					})
				}
				this.dialogVisible=false;
			},
			applyChangeDorm(scope){
				this.changeVisible=true;
				this.scope=scope.row
			},
			submit(){
				this.changeVisible=false;
				this.$refs.changeDorm.submit(this.scope);//调用组件内方法
			},
			
			submitRepaire(){ //申请改舍
				this.$refs.repaire.submit(this.scope);
				this.repaireVisible=false;
			},
			rePaire(scope){
				this.scope=scope;
				this.repaireVisible=true;
			}
		
		},
	}
</script>

<style scoped="scoped">
	.search{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content:flex-start;
		align-items: center;
	}
	 .el-form-item{
		 display: flex; 
		 align-items: center;
		width:25%;
		margin-right: 1%;
	}
	 .show, .submit{
		width: 10%;
		margin-right: 0;
	}
	.show{
		color: #0000EE;
	}
	.change-sub{
		margin: 0 auto;
	}	
	
</style>
