<template>
	<div>
		<!-- 搜索框 -->
		<el-form class="search" :model="form">
			
				<el-form-item label="姓名:">
					<el-input   type="text" v-model="form.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="学号:">
					<el-input v-model="form.stuNum" placeholder="请输入学号"></el-input>
				</el-form-item>
				<el-form-item label="宿舍号:">
					<el-input   v-model="form.dormNum" placeholder="请输入宿舍号"></el-input>
				</el-form-item>
				<el-form-item label="性别:" v-show="isSearch">
					<el-select size="medium" multiple collapse-tags  v-model="form.sex" placeholder="请选择性别">
						<el-option   label="男"  value="男"></el-option>
						<el-option   label="女"  value="女"></el-option>
					  </el-select>
					   </el-form-item>
				 <el-form-item label="宿舍状态:"  v-show="isSearch" >
					<el-select multiple collapse-tags v-model="form.isRepaire" placeholder="请选择状态">
						<el-option   label="正常"  value="false"></el-option>
						<el-option   label="维修"  value="true"></el-option>
					 </el-select>
				 </el-form-item>
				 <el-form-item class="show">
				 	<span   v-show='isSearch==false' @click="isSearch=!isSearch">是否显示<i class="el-icon-arrow-down"> </i></span>
					<span v-show='isSearch==true'  @click="isSearch=!isSearch">是否隐藏<i class="el-icon-arrow-up"> </i></span>
				 </el-form-item >
				   <el-form-item class="submit">
				     <el-button type="primary" @click="onSubmit">搜索</el-button>
				     
				  </el-form-item>
			
		</el-form>
		<el-table :data="tableData"  style="width: 100%">
			<el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="dorm.dormNum" label="宿舍" width="180"></el-table-column>
			<el-table-column prop="sex" label="学生性别" width="180"></el-table-column>
			<el-table-column prop="dorm.state" label="学生状态" width="180"></el-table-column>
			<el-table-column prop="number" label="联系方式" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" @click='assignmentDorm(scope.row)' :disabled="scope.row.dorm.state=='已有宿舍'">分配宿舍</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog width="30%" title="选择宿舍" :visible.sync="dormVisible">
			<el-form width="600px" :model='dormModel' ref='form' :rules="rules"> 
				<el-form-item class="select" label="请选择宿舍:" prop="dormNum" >
					<el-select v-model="dormModel.dormNum" >
						<el-option v-for="item in dorm" :value="item" placeholder='选择分配的宿舍:'></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			  <el-button @click="dormVisible = false">取 消</el-button>
			  <el-button type="primary" @click="assignmentDormSub">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	 import {
		 search,
		 getAllStudents,
		assignmentDorm,
		getDorm
	 } from '@/api/api'
	export default{
		mounted() {
			this.getStudentsList();
			getDorm().then(res=>{
				let data =res.data;
				data.forEach(item=>{
					this.dorm.push(item.dormNum)
				})
			})
		},
		data(){
			return{
				dormVisible:false,
				isSearch:false,
				form:{
					name:'',
					stuNum:'',
					dormNum:'',
					sex:'',
					isRepaire:''
				},
				tableData:[],
				dormModel:{
					dormNum:'', //宿管输入更改到的宿舍
				},
				
				dorm:[],
				params:{},
				rules:{
					dormNum:[{required:true,trigger:blur,message:'请选择宿舍'}]
				}
			}
		},
		methods:{
			onSubmit(){//搜索
				let params={
					name:this.form.name,
					stuNum:this.form.stuNum,
					dormNum:this.form.dormNum,
					sex:this.form.sex,
					isRepaire:this.form.isRepaire
				}
				search(params).then(res=>{
					this.tableData=res.data;
					this.tableData.forEach(item=>{
						let arr=item;
						if(item.dorm.dormNum==''){
							arr.dorm.state='无宿舍'
						}else{
							arr.dorm.state='已有宿舍'
						}
						
						return arr
					})
				})
			},
			
			getStudentsList(){ //获取所有学生
				getAllStudents().then(res =>{
					this.tableData=res.data;
					this.tableData.forEach(item=>{
						let arr=item;
						if(item.dorm.dormNum==''){
							arr.dorm.state='无宿舍'
						}else{
							arr.dorm.state='已有宿舍'
						}
						return arr
					})
				})
			},
			assignmentDorm(scope){ //获取点击行数据
				this.dormVisible=true;
				let params ={
					id:scope._id,
					name:scope.name,
					stuNum:scope.stuNum,
					
				}
				this.params=params
				
			},
			assignmentDormSub(){
				this.$refs.form.validate(valid=>{
					if(valid){
						this.params.dormNum=this.dormModel.dormNum;
						assignmentDorm(this.params).then(res=>{
							this.dormVisible=false;
							this.getStudentsList();
						})
					}else{
						alert('未选择宿舍')
					}
					this.dormVisible=false
				})
				
			}
		}
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
	.dialog-footer{
		text-align: center;
	}
	.select{
		width: 100%;
	}
</style>
