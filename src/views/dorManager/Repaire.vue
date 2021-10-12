<template>
	<!-- 宿舍列表 -->
	<div>
		<div class="search">
			<el-form :model="searchForm" style="text-align: left;" :inline=true >
				<el-form-item label="宿舍号:" clearable>
					<el-input placeholder="请输入宿舍号:" v-model="searchForm.dormNum"></el-input>
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
				<el-table-column label="操作"  align="center" >
					<template slot-scope="scope">
						<el-button type="primary" @click="sureDormRepaire(scope.row)"> 确定维修</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
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
			this.searchDorm()
		},
		data(){
			return{
				searchForm:{
					dormNum:'',
					isRepaire:true
				},
				dormList:[]
			}
		},
		methods:{
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
		
		}
	}
</script>

<style scoped="scoped">
</style>
