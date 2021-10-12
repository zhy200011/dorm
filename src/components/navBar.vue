<template>
	<div class="nav">
		
			<template  v-for="item in list">
			  <el-submenu  :index="item.path"  :key='item.id' v-if="item.children" >
				<template slot="title">
				 <i class="el-icon-location"></i>
				  <span>{{item.name}}</span>
				
				</template>
				  <navBar :list='item.children'></navBar>
			  </el-submenu>
			  <el-menu-item :index="item.path" :key='item.id'  v-else>
			&nbsp;&nbsp;&nbsp;	&nbsp;	<i class="el-icon-location"></i>{{item.name}}
			  </el-menu-item>
			</template>
		
		 
	 </div>
</template>

<script>
	export default{
		name:'navBar',
		props:['list'],
		mounted() {
			
		},
		data(){
			return{}
		},
		methods: { },
	}
</script>

<style>
</style>
