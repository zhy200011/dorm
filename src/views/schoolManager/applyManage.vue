<template>
	<div>
		<el-table :data="changeDormData">
			<el-table-column label="学号"  prop="stuNum" align="center"></el-table-column>
			<el-table-column label="姓名"   prop="name" align="center"></el-table-column>
			<el-table-column label="性别"   prop="sex" align="center"></el-table-column>
			<el-table-column label="现有宿舍"  prop="dorm.dormNum" align="center"></el-table-column>
			<el-table-column label="期望宿舍" prop="wishDorm" align="center"></el-table-column>
			<el-table-column label="改舍原因"  prop="note" align="center"></el-table-column>
			<el-table-column fixed="right" width="200px" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="sureChange(scope.row)">同意改舍</el-button>
					<el-button type="primary"size="mini"  @click="refuseChange(scope.row)">拒绝改舍</el-button>
				</template>
			</el-table-column>
		</el-table>
			
			
	</div>
</template>

<script>
	import {
		getAllStudents,
		manageChange
		} from '@/api/api'
 	export default{
		data(){
			return{
				changeDormData:[],//改舍数据
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			getData(){
				getAllStudents().then(res=>{
					let changeDorm=[];
					 res.data.forEach(item=>{
						 if(item.isSubChange){
							 changeDorm.push(item)
						 };
					
					 });
					this.changeDormData=changeDorm;
					
				})
			},
			sureChange(scope){
				scope.stateManage=true; 
				manageChange(scope).then(res=>{
					this.getData();
				})
			},
			refuseChange(scope){
				scope.stateManage=false; 
				manageChange(scope).then(res=>{
					this.getData();
				})
			}
		}
	}
</script>

<style>
</style>
