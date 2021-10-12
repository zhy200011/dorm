<template>
	<div class="login">
		<div class="form">
			<h3>宿舍管理系统</h3>
			<el-form label-width="80px" label-position="right" :model="form">
				<el-form-item  label="账号:">
					<el-input  v-model="form.stuNum" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item   label="密码:">
					<el-input  show-password type="password" v-model="form.passWord" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item  style="margin-right: 100px;">
					<el-button type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	<img class="img" src="../assets/cdnu.webp" />
	</div>
</template>

<script>
	import {login} from '@/api/api'
	export default{
		mounted() {
		
		},
		data(){
			return{
				form:{
					stuNum:'',
					passWord:'',
				}
			}
		},
		methods:{
			login(){
				login(this.form).then(res=>{
					if(res.message=='账号密码不匹配'){
						alert("账号密码不匹配");
					}else if(res.code==200){
						sessionStorage.setItem("userAccount",this.form.stuNum);
						sessionStorage.setItem("role",res.role);
						sessionStorage.setItem('name',res.name);
						this.$router.push('/Students');
					}
				})
			}
		}
		
	}
</script>

<style scoped="scoped">
	.login{
		margin-top: 200px;
		margin-left: 800px;
	}
	.form{
		
		width: 300px;
		height: 300px;
		padding: 3%;
		background-color: rgba(255,255,255,0.5);
		box-shadow: 0px 0px 5px  5px rgba(147, 147, 147, 0.4);
	}
	.el-form{
		margin: 50px auto;
		height: 200px;
		
	}
	
	.img{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 10px;
		overflow: hidden;
		left: 0;
		z-index: -5;
	}
</style>
