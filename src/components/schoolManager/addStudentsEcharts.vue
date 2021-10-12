<template>
	<div class="charts">
		<div style="width:300px;
				height: 300px;" ref="chartsOne"></div>
		<div style="width:300px;
				height: 300px;" ref="chartsTwo"></div>
	</div>
</template>

<script>
	import {getAllStudents} from '@/api/api'
	export default{
		props:{
			
		},
		beforeMount() {
			
		},
		mounted() {
			this.getEcharts()
			
		},
		data(){
			return{
				optionSex : {
				            title: {
				                text: '男女'
				            },
				            tooltip: {},
				            legend: {
				                data:['数量']
				            },
				            xAxis: {
				                data: ["男","女"]
				            },
				            yAxis: {},
				            series: [{
				                name: '数量',
				                type: 'bar',
				                data:[0,0]
				            }]
				        },  
				optionChange: {
					          title: {
					              text: '改舍比例'
					          },
					          tooltip: {},
					          legend: {
					              data:['数量']
					          },
					          xAxis: {
					              data: ["申请改舍","未申请改舍"]
					          },
					          yAxis: {},
					          series: [{
					              name: '数量',
					              type: 'bar',
					              data:[0,0]
					          }]
					      },
						  
					
			}
				
	
		},
		methods:{
			getEcharts(){
				let myChart=this.$echarts.init(this.$refs.chartsOne);
				let myChart2=this.$echarts.init(this.$refs.chartsTwo);
				getAllStudents().then(res=>{
						let data =res.data;
						let lengthNan=0;
						let lengthNv=0;
						let isChange=0;
						let noChange=0;
						data.forEach(item=>{
							if(item.sex=='男'){
								lengthNan++	;
							}else{
								lengthNv++;
							}
							if(item.isChange){
								isChange++
							}else{
								noChange++
							}
						});
						this.optionSex.series[0].data[0]=lengthNan;
						this.optionSex.series[0].data[1]=lengthNv;
						this.optionChange.series[0].data[0]=isChange;
						this.optionChange.series[0].data[1]=noChange;
						myChart.setOption(this.optionSex);
						myChart2.setOption(this.optionChange);
						
					})
			}
				
		}
	}
</script>

<style> 
.charts{
	width: 100%;
	height: 300px;
	display: flex;
	justify-content:space-around;
	align-items: center;
}

</style>
