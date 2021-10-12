<template>
	<div class="main">
		<el-container>
		  <el-header>
			  <Header></Header>
		  </el-header>
			  <el-container>
					<el-aside width="200px" >
						<el-menu collapse-transition unique-opened router>
							<navBar :list='list'></navBar>
						</el-menu>
						
					</el-aside>
					
					
					<el-container>
						<el-main>
						  <transition name="fade" mode="out-in" >
							<router-view></router-view>
						  </transition>
						</el-main>
					</el-container>
			  </el-container>
		</el-container>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import navBar from 'components/navBar'
	export default{
		components:{
			navBar,
			Header,
		},
		mounted() {
			let userAccount=window.sessionStorage.getItem("userAccount")
			if(!userAccount){
				alert("未登录");
				this.$router.push('/Login')
			}
			let role=sessionStorage.getItem('role');
			let list =JSON.parse(JSON.stringify(this.list));
			this.list={};
			console.log(role)
			switch(role){
				case "1": 
				this.list.Students=list.Students;
				console.log(this.list)
				break;
				case "2":
				this.list.Students=list.Students;
				this.list.dormManager=list.dormManager;
				break;
				case "3":
				this.list=list;
				break
				
			}
			
		},
		data(){
			return{
				list:{
						Students:{
							flag:1,
							id:'1',
							name:'学生管理',
							path:'/Students',
							children:{
								findSlef:{
									id:'1-1',
									name:'学生个人',
									path:'/Students/findSlef',
								},
								changeDorm:{
									id:'1-2',
									name:'更改宿舍',
									path:'/Students/changeDorm',
								},
								subRepaire:{
									id:'1-3',
									name:'提交维修',
									path:'/Students/subRepaire',
								}
							}
						},
						dorManager:{
							flag:2,
							id:'2',
							name:'宿舍管理',
							path:'/dorManager',
							children:{
								allStudents:{
									id:'2-1',
									name:'所有学生',
									path:'/dorManager/allStudents',
								},
								dormList:{
									id:'2-2',
									name:'宿舍列表',
									path:'/dorManager/dormList',
								},
								Repaire:{
									id:'2-3',
									name:'维修列表',
									path:'/dorManager/Repaire',
								},
							}
						},
						school:{
							flag:3,
							id:'3',
							name:'学校管理',
							path:'/schoolManager',
							children:{
								acountManager:{
									id:'3-1',
									name:'统计管理',
									path:'/schoolManager/accountManage',
								},
								allotDorm:{
									id:'3-2',
									name:'分配宿舍',
									path:'/schoolManager/allotDorm',
								},
								applyManager:{
									id:'3-3',
									name:'申请管理',
									path:'/schoolManager/applyManage',
								}
							}
						}
					},
				
			}
		}
		
	}
	
</script>

<style scoped="scoped">
	.el-aside{
		margin-top: 5px;
		height: 500px;
	}
</style>
