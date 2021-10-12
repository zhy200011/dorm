import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//登录页面
const  Login = ()=>import ('views/Login.vue');
const Main = ()=>import('views/Main')
//学生页面
const changeDorm=()=> import('views/Students/changeDorm');
const findSlef=()=>import('views/Students/findSlef');
const subRepaire=()=>import('views/Students/subRepaire');
//学校管理员页面
const accountManage=()=>import('views/schoolManager/accountManage');
const allotDorm=()=>import('views/schoolManager/allotDorm');
const applyManage=()=>import('views/schoolManager/applyManage');
//宿舍管理员页面
const allStudents=()=>import('views/dorManager/allStudents');
const dormList=()=>import('views/dorManager/dormList');
const Repaire=()=>import('views/dorManager/Repaire');

const routes=[
	{
		path:'/',
		redirect:'/Login',
		component:Login
	},
	{
		path:'/Login',
		component:Login,
	},
	// 学生
	{
		path:'/Students',
		redirect:'Students/findSlef',
		component:Main,
		children:[
			{
				path:'changeDorm',//改宿舍
				component:changeDorm
			},
			{
				path:'findSlef',//学生个人
				component:findSlef
			},
			{
				path:'subRepaire',//上报维修
				component:subRepaire
			},
		],
		
	},
	//学校管理
	{
		path:'/schoolManager',
		redirect:'/schoolManager/accountManage',
		component:Main,
		children:[
			{
				path:'accountManage',
				component:accountManage
			},
			{
				path:'allotDorm',
				component:allotDorm
			},
			{
				path:'applyManage',
				component:applyManage
			},
		],
		
	},
	//宿舍管理
	{
		path:'/dorManager',
		redirect:'/dorManager/accountManage',
		component:Main,
		children:[
			{
				path:'allStudents',//所有学生
				component:allStudents
			},
			{
				path:'dormList',//宿舍列表
				component:dormList
			},
			{
				path:'Repaire',//维修列表
				component:Repaire
			},
		],
		
	},


	
]
const router=new VueRouter({
	routes,
	
})
export default router