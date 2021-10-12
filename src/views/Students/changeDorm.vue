
<template>
	<div class="change">
		<el-table  :data="tableData" style="width:100%">
		     <el-table-column
		       prop="name"
		       label="姓名"
		       width="180">
		     </el-table-column>
			 
			 <el-table-column
			   prop="stuNum"
			   label="学号"
			   width="180">
			 </el-table-column>
			 <el-table-column
			   prop="wishDorm"
			   label="期望宿舍"
			   width="180">
			 </el-table-column>
			 <el-table-column
			   prop="sex"
			   label="性别"
			   width="180">
			 </el-table-column>
		     <el-table-column
		       prop="number"
		       label="联系方式">
		     </el-table-column>
			 <el-table-column
			   prop="note"
			   label="备注">
			 </el-table-column>
					<el-table-column fixed="right" label="操作" width="200">
						 <template slot-scope='scope'>
							<el-button  type='primary' :disabled=" userAccount==1000 ? false: scope.row.stuNum!=userAccount&&scope.row.isSubChange==true "  @click='subMit(scope.row)' size="small">提交</el-button>
							<el-button  type='primary' :disabled=" userAccount==1000 ? false: scope.row.stuNum!=userAccount&&scope.row.isSubChange==true"  @click='subChange(scope.row)' size="small">更改</el-button>
						</template>
			</el-table-column>
		   </el-table> 
			<el-dialog center="center" width="30%" :visible.sync="subChangeVisible">
				<change-dorm ref="changeDorm"></change-dorm>
				<span slot='footer' >
					<el-button @click="repaireVisible = false">取 消</el-button>
					<el-button  type="primary" @click='submitRepaire'> 更改</el-button>
				</span>
			</el-dialog>
	</div>
</template>

<script>
	import {getAllStudents,
		subChange
	} from '@/api/api'
	import changeDorm from '@/components/Students/changeDorm.vue'
	export default{
		mounted() {
			this.getTableList();
		},
		components:{
			changeDorm,
		},
		data(){
			return{
				tableData: [{
							dormNum: '1-1-1',
							stuNum:'1001',
							number:'13556591167',
							note:'没事，就想换宿舍',
				           name: '王小虎',
				           sex: '男',
						   wishDorm:'6-1-2' }, ],
				 userAccount:'',  
				subChangeVisible:false,
				scope:{},
			}
		},
		methods:{
			subChange(scope){ //打开更改框
				this.subChangeVisible=true;
				this.scope=scope
			},
			submitRepaire(){ //提交更改
				this.$refs.changeDorm.submit(this.scope)
				setTimeout(()=>{
					this.subChangeVisible=false;
					this.getTableList();
				},100);
				
			},
			subMit(scope){
					let params ={
						name:scope.name,
						stuNum:scope.stuNum,
						id:scope._id
					};
					subChange(params).then(res=>{
						if(res.message=='提交成功'){
							this.getTableList();
						}
					})
					
			},
			getTableList(){
				this.userAccount=sessionStorage.getItem('userAccount')
				getAllStudents(this.userAccount).then(res=>{
					if(res.code==200){
						let arr=[];
						res.data.forEach(item=>{
							if(item.isChange){
								arr.push(item)
							}
						})
						console.log(arr)
						this.tableData=arr;
						
						
					}
					
				})
			},
			
		},
	}
</script>

<style scoped="scoped">
</style>
