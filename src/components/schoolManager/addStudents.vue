<template>
	<div  class="add">
		<el-form class="form"  label-width="80px"  label-position="right" :model="form" :rules="rules" ref="form">
			<el-form-item prop="name" label="姓名:">
				<el-input placeholder="请输入姓名" v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item prop="stuNum" label="学号:" >
				<el-input  placeholder="请输入学号" v-model="form.stuNum"></el-input>
			</el-form-item>
			<el-form-item prop="sex"  label="性别:">
				<el-select placeholder="请选择性别" v-model="form.sex">
					<el-option value="男"></el-option>
					<el-option value="女"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="age" label="年龄:" >
				<el-input placeholder="请输入年龄" v-model="form.age"></el-input>
			</el-form-item>
			<el-form-item prop="dorm" label="宿舍号:"  >
				<el-select placeholder="请选择宿舍" v-model="form.dormNum" clearable>
					<el-option v-for="item in dorm" :value='item' :key='item'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item type='email' prop="number" label="联系方式:" >
				<el-input v-model="form.number" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item >
				<el-button type="primary"@click="submit">立即添加</el-button>
			</el-form-item>
		</el-form>
		<el-divider content-position='center'>删除学生</el-divider>
		<el-form ref='deleteForm' :inline=true :rules="deleteRules" :model="stuForm">
			<el-form-item  label="学号:" prop="stuNum" >
				<el-select v-model="stuForm.stuNum" clearable placeholder="请选择学号">
					<el-option v-for="item in stuNums" :value='item'  ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item > 
				<el-button type="primary" @click='deleteStudents'>删除学生</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script> 
	import {addStudents,getDorm,getAllStudents,deleteStudents} from '@/api/api'
	export default{
		data(){
			return{
				form:{
					name:'',
					stuNum:'',
					sex:'',
					dormNum:'',
					number:'',
					age:'',
				},
				stuForm:{
					stuNum:''
				},
				stuNums:[],
				rules:{
					name:[{
						type:'string',
						required:true,
						message:'必须输入姓名',
						trigger:blur,
					}],
					stuNum:[{
						required:true,
						trriger:blur,
						message:'必须输入学号'
					},{
						pattern:/\d{11}/, //匹配数字
						message:'必须为数字',
						trriger:blur,
					},{
						min:11,
						max:11,
						trriger:blur,
						message:'必须输入正确长度学号'
					},],
					number:{
						pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
						trriger:blur,
						message:'必须输入邮箱'
					},
					age:{
						pattern:/^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
						message:'输入正确的年龄',
						trriger:blur,
					}
					
				},
				deleteRules:{
					stuNum:[
						{required:true,
						message:'必须选择学号'
						}
					]
				},
				dorm:[],
				
			}
		},
		mounted() {
			getDorm().then(res=>{
				let data=res.data;
				data.forEach(item=>{
					this.dorm.push(item.dormNum)
				})
			});
			this.getAllStudents();
		},
		methods:{
			submit(){
				this.$refs.form.validate(valid=>{
					if(valid){
						addStudents(this.form).then(res=>{
							if(res.message=='新增成功'){
								this.$emit('changeStudents');
								alert('新增学生成功');
								this.form={};
								this.getAllStudents();
							}else if(res.message=='学号重复'){
								alert('已有学生');
							}else if(res.message=='宿舍已满'){
								alert('宿舍已满')
							}
							
						})
					}
				})
				
			},
			deleteStudents(){
				this.$refs.deleteForm.validate(valid=>{
					if(valid){
						let params ={stuNum:this.stuForm.stuNum}
						deleteStudents(params).then(res=>{
							
							this.$emit('changeStudents');
							
							this.getAllStudents();
						})
					}
				})
			},
			getAllStudents(){
				getAllStudents().then(res=>{
					let data =res.data;
					this.stuNums=[];
					data.forEach(item=>{
						this.stuNums.push(item.stuNum)
					})
				})
			},
	
		}
	}
</script>

<style scoped="scoped">
	.form{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
