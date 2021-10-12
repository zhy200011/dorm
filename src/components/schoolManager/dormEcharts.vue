<template>
	<div class="charts">
		<div style="width:300px;height: 300px;" ref="chartsOne"></div>
		<div style="width:300px;height: 300px;" ref="chartsTwo"></div>
	</div>
</template>

<script>
	import {getDorm} from '@/api/api.js'
	export default{
		data(){
			return{
				optionOne:{ 
					title: {
					    text: '维修'
					   },
					   tooltip: {},
					   legend: {
					       data:['数量']
					   },
					   xAxis: {
					       data: ["维修中","完好"]
					   },
					   yAxis: {},
					   series: [{
					       name: '数量',
					       type: 'bar',
					       data:[2,0]
					   }],
				},
				optionTwo:{
					title: {
					    text: '住宿情况'
					   },
					   tooltip: {},
					   legend: {
					       data:['数量']
					   },
					   xAxis: {
					       data: ["满员","未满"]
					   },
					   yAxis: {},
					   series: [{
					       name: '数量',
					       type: 'bar',
					       data:[2,0]
					   }],
				}
			}
		},
		mounted() {
			this.getEcharts();
		},
		methods:{
			getEcharts(){
				let chartsOne=this.$echarts.init(this.$refs.chartsOne);
				let chartsTwo=this.$echarts.init(this.$refs.chartsTwo);
				getDorm().then(res=>{
					let data =res.data
					let isRepaire=0;
					let isFull =0;
					data.forEach(item =>{
						if(item.isRepaire){
							isRepaire++
						}
						if(item.students.length>=6){
							isFull++
						}
					})
					this.optionOne.series[0].data[0]=isRepaire;
					this.optionOne.series[0].data[1]=data.length-isRepaire;
					this.optionTwo.series[0].data[0]=isFull;
					this.optionTwo.series[0].data[1]=data.length-isFull;
					chartsOne.setOption(this.optionOne);
					chartsTwo.setOption(this.optionTwo);
				})
			}
		}
	}
</script>

<style scoped="scoped">
	
	.chartsOne,.chartsTwo{
		width: 30%;
		height: 300px;
	}
</style>
