<template>
	<!-- 宿舍列表 -->
	<div>
		<div class="search">
			<el-form :model="searchForm" style="text-align: left;" :inline=true >
				<el-form-item label="宿舍号:" clearable>
					<el-input placeholder="请输入宿舍号:" v-model="searchForm.dormNum"></el-input>
				</el-form-item>
				<el-form-item label="宿舍维修情况:">
					<el-select v-model="searchForm.isRepaire" clearable collapse-tags>
						<el-option value="true" key="1" label="维修中">维修中</el-option>
						<el-option value="false" key="2" label="完好">完好</el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item >
					<el-button type="primary" @click="searchDorm">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="list">
			<el-table :data="dormList">
				<el-table-column label="宿舍名" align="center" prop="dormNum"></el-table-column>
				<el-table-column label="宿舍状态"  align="center" prop="isRepaire"></el-table-column>
				<el-table-column label="宿舍成员" align="center"  prop="isFull"></el-table-column>
				<el-table-column label="维修类型" align="center"  prop="damageType"></el-table-column>
				<el-table-column label="维修备注" align="center"  prop="note"></el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope='scope'>
						<el-button type="primary" size="small" @click="detailsBtn(scope.row)" >查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :visible.sync="detailsVisible">
			<el-table :data="detailsData">
				<el-table-column align="center" label="学生学号" prop="stuNum"></el-table-column>
				<el-table-column align="center" label="学生姓名" prop="name"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getDorm,
		sureDormRepaire,
		searchDorm
	} from '@/api/api'
	export default{
		mounted() {
			this.getDorm();
		},
		data(){
			return{
				searchForm:{
					dormNum:'',
					isRepaire:'',
				},
				dormList:[],
				detailsVisible:false,
				detailsData:[],
			}
		},
		methods:{
			getDorm(){
				getDorm().then(res=>{
					this.dormList=res.data;
					
					this.dormList.map(item=>{
						let arr;
						arr=item;
						if(arr.students.length<6){
							arr.isFull='未满'
						}else{
							arr.isFull='已满'
						};
						if(arr.isRepaire){
							arr.isRepaire='维修中'
						}else{
							arr.isRepaire='完好'
						}
						return arr;
					})
				})
			},
			sureDormRepaire(scope){
				let date=new Date();
				let month =date.getMonth()+1;
				let year =date.getFullYear();
				let day =date.getDate();
				let nowDate=year+'-'+month+'-'+day;
				// console.log(scope.dormNum)
				
				sureDormRepaire(
				{
					dormNum:scope.dormNum,
					date:nowDate
				}).then(res=>{
					this.dormList=res.data;
					this.dormList.map(item=>{
						let arr;
						arr=item;
						if(arr.students.length<6){
							arr.isFull='未满'
						}else{
							arr.isFull='已满'
						};
						if(arr.isRepaire){
							arr.isRepaire='维修中'
						}else{
							arr.isRepaire='完好'
						}
						return arr;
					})
				})
			},
			searchDorm(){
				console.log(this.searchForm)
				searchDorm(this.searchForm).then(res=>{
					this.dormList=res.data;
					this.dormList.map(item=>{
						let arr;
						arr=item;
						if(arr.students.length<6){
							arr.isFull='未满'
						}else{
							arr.isFull='已满'
						};
						if(arr.isRepaire){
							arr.isRepaire='维修中'
						}else{
							arr.isRepaire='完好'
						}
						return arr;
					})
				})			
			},
			detailsBtn(scope){
				this.detailsVisible=true;
				getDorm(scope.dormNum).then(res=>{
					this.detailsData=res.data.students
					console.log(this.detailsData)
				})
			}
		}
	}
</script>

<style scoped="scoped">
</style>
