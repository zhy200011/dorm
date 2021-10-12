<template>
	<div class="header">
		<div class="logo"> 
			<img class="img" src="../assets/logo.png" />
			<h3>宿舍分配系统</h3>
		</div>
		<div class="tools">
			<div class="masage "></div>
			<el-dropdown>
				<p class="loginCont">
					<i class="masage el-icon-user"></i>
					<span>{{name}}</span>
					<span class="circle">
						<i class="el-icon-caret-top" ref='exiticon'></i>
					</span>
				</p>
				<el-dropdown-menu slot="dropdown" style='width: 145px;text-align: center;position: relative;'>
					<el-dropdown-item command="2">
						<el-row type="flex" justify="center">
							<el-col :span='2'>
							</el-col>
							<el-col  :span='15'>
								<span @click="reLogin">退出系统</span>
							</el-col>
						</el-row>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				imgUrl:'../assets/logo.png'
			}
		},
		mounted() {
			this.name=sessionStorage.getItem('name')
		},
		methods:{
			reLogin(){
				this.$router.push('/Login')
			}
		}
	}
</script>

<style scoped="scoped">
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #55aaff;
	}
	.img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.masage{
		font-size: 1.5rem;
	}
	.logo,.tools,.el-dropdown{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: 100px;
	}
	.logo{
		width: 20%;
		
	}
	.tools{
		width: 20%;
	}
	.el-dropdown{
		width: 40%;
		display: flex;
		align-items: center;
	}
	.loginCont{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content:space-between;
	}
	
</style>
