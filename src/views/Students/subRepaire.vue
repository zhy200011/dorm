
<template>
	<div class="change">
		<el-table :data="tableData" style="width: 100%">
		     <el-table-column
		       prop="dormNum"
		       label="宿舍号"
		       width="180">
		     </el-table-column>
			 
			 <el-table-column
			   prop="damageType"
			   label="损坏类型"
			   width="180">
			 </el-table-column>
			 <el-table-column
			   prop="repaireDate"
			   label="日期"
			   width="180">
			 </el-table-column>
			 <el-table-column
			   prop="urgencyDegree"
			   label="紧急程度"
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
							<el-button  type='primary' :disabled=" userAccount==1000 ? false: scope.row.Account!=userAccount&&scope.row.isSubRepaire==true"  @click='submitApply(scope.row)' size="small">提交</el-button>
							
							<el-button  type='primary' :disabled=" userAccount==1000 ? false: scope.row.Account!=userAccount&&scope.row.isSubRepaire==true"  @click='change(scope.row)' size="small">更改</el-button>
							
						</template>
					</el-table-column>
		   </el-table> 
		<el-dialog center="center" width="30%" :visible.sync="changeRepaire">
			<repaire @getList='getTableList' ref="repaire"> </repaire>
			<span slot='footer' >
				<el-button @click="changeRepaire = false">取 消</el-button>
				<el-button  type="primary" @click='submit'> 提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	 import {
		getAllStudents,
		getDorm,
		subApllyRepaire
	 } from '@/api/api'
	 import repaire from '@/components/Students/repaire'
	export default{
		components:{
			repaire
		},
		mounted() {
			this.getTableList();
		},
		
		data(){
			return{
				scope:{},
				tableData: [
					{
						dormNum: '1-1-1',
						number:'13556591167',
						note:'修一下宿舍',
						students:{
						   name:'王小虎',
						   stuNum:'1000'
					   },
				        urgencyDegree: '非常紧急',
					   repaireDate:'2021-01-25',
						damageType:'人为'
					
				       }, ],
				userAccount:'10000',
				name:'',
				changeRepaire:false,//控制更改显示
			}
		},
		methods:{
			change(scope){//点击更改
				this.scope=scope;
				this.changeRepaire=true;
			},
			submit(){//提交更改
				this.$refs.repaire.submitChange(this.scope)
				this.changeRepaire=false;
				
			},
			submitApply(scope){
				let params={
					stuNum:scope.stuNum,
					dormNum:scope.dormNum
				};
				subApllyRepaire(params).then(res=>{
					if(res.message=='提交申请成功'){
						this.getTableList()
					}
				})
			},
			getTableList(){
				this.userAccount=sessionStorage.getItem('userAccount')
				this.tableData=[];
				getAllStudents(this.userAccount).then(res=>{
					let arr=[];
					res.data.forEach(item=>{
						if(item.isRepaire){
							if(arr.indexOf(item.dorm.dormNum)==-1){
								arr.push({domrNum:item.dorm.dormNum,stuNum:item.stuNum})
							}
						}
					})
					arr.forEach(item=>{
						getDorm(item.dormNum).then(res=>{
							res.data[0].stuNum=item.stuNum;
							this.tableData.push(res.data[0]);
						})
					})
					console.log(this.tableData)
				})
			}
			
		}
	}
</script>

<style scoped="scoped">
</style>
