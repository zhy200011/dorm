<template>
	<div>
		<el-tabs type="card" v-model="activeName">
			<el-tab-pane label="添加学生" name="addStudents">
				<add-students-echarts ref='stuCharts'></add-students-echarts>
				<el-divider content-position='center'>添加学生</el-divider>
				<add-students @changeStudents="changeStudents"></add-students>
			</el-tab-pane>
			<el-tab-pane label="新增宿舍" name="addDorm">
				<dorm-echarts ref='dormCharts'></dorm-echarts>
				<el-divider content-position='center'>添加宿舍</el-divider>
				<add-dorm @changeDorm='changeDorm'></add-dorm>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import addStudents from '@/components/schoolManager/addStudents';
	import addDorm from'@/components/schoolManager/addDorm';
	import addStudentsEcharts from '@/components/schoolManager/addStudentsEcharts.vue';
	import dormEcharts from '@/components/schoolManager/dormEcharts.vue';
	export default{
		components:{
			addStudents,
			addDorm,
			addStudentsEcharts,
			dormEcharts,
			
		},
		data(){
			return{
				activeName:'addStudents'
			}
		},
		methods:{
			changeDorm(){
				this.$refs.dormCharts.getEcharts(); //修改图表数据
			},
			changeStudents(){
				this.$refs.stuCharts.getEcharts();
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>
