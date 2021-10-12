<template>
	<div>
		<el-table :data="tableList">
			<el-table-column label="姓名" prop="name" align="center"></el-table-column>
			<el-table-column label="学号" prop="stuNum" align="center"></el-table-column>
			<el-table-column label="性别" prop="sex" align="center"></el-table-column>
			<el-table-column label="年龄" prop="age" align="center"></el-table-column>
			<el-table-column label="期待宿舍" prop="wishDorm" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click="allotDorm(scope.row)" type="primary">分配宿舍</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible.sync="isVisible">
			<el-form ref='form' :model="form" :rules="rules">
				<el-form-item prop="dormNum" label="选择分配的宿舍:">
					<el-select v-model="form.dormNum">
						<el-option v-for="item in dorm" :key="item.dormNum" :label="item.dormNum" :value="item.dormNum" >
							<span style="color: skyblue; float: left;" v-if="item.dormNum==wishDorm" >{{item.dormNum}}</span>
							<span style="color:skyblue;  float: right;" v-if="item.dormNum==wishDorm" >期望宿舍</span>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="sureAllotDorm"> 确定</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getAllStudents,
		getDorm,
		assignmentDorm
	} from '@/api/api'
	export default{
		data(){
			return{
				tableList:[],
				isVisible:false,
				form:{},
				dorm:[],
					dormNum:[{
						required:true,
						message:'选择宿舍',
						trigger:'change'
					}],
				
				userData:{},
				wishDorm:'',
				rules:{}
			}
		},
		mounted() {
			this.getStudentOfNoDorm();
		},
		methods:{
			allotDorm(scope){ 
				this.isVisible=true;
				this.wishDorm=scope.wishDorm;
				this.userData=scope;
				this.getDorm();
			},
			sureAllotDorm(){ //确定分配宿舍
			this.$refs.form.validate(valid=>{
				if(valid){
						this.userData.dormNum=this.form.dormNum;
						this.userData.id=this.userData._id;
						assignmentDorm(this.userData).then(res=>{
							if(res.message=='添加成功'){
								this.getStudentOfNoDorm();
								this.isVisible=false;
							}else if(res.message=='宿舍已满'){
								alert('宿舍已满')
							}
						
						})
						
				}
			})
			},
			getStudentOfNoDorm(){ //获取没有宿舍的学生
				getAllStudents().then(res=>{
					let arr=[];
					res.data.forEach(item=>{
						if(item.dorm.dormNum==''){
							arr.push(item)
						}
					})
					this.tableList=arr
					
				})
			},
			getDorm(){
				getDorm().then(res=>{
					this.dorm=res.data
				})
			}
		}
	}
</script>

<style>
</style>
