<template>
	<view class="gaguge-canvas">
		<mpvue-echarts id="main" ref="mapChart" @onInit="init" />
	</view>
</template>
<script>
	import * as echarts from "@/assets/echarts.min.js";
	import mpvueEcharts from "./mpvue-echarts/src/echarts.vue";
	
	export default {
		name:"gauge-chart",
		props:[ "echartData" ],
		components:{
			mpvueEcharts
		},
		data() {
			return {
				series: [{
					type: 'gauge',
					startAngle: 180,
					endAngle: 0,
					min: 0,
					max: 100,
					splitNumber: 2,
					axisLine: {
						lineStyle: {
							width: 6,
							color: [
								[0.1, '#7CFFB2'],
								[0.3, '#58D9F9'],
								[0.4, '#FDDD60'],
								[0.5, '#FDAB4D'],
								[1, '#FF5263']
							]
						}
					},
					pointer: {
						icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
						length: '16%',
						width: 12,
						offsetCenter: [0, '-55%'],
						itemStyle: {
							color: 'auto'
						}
					},
					axisTick: {
						length: 6,
						splitNumber: 5,
						lineStyle: {
							color: 'auto',
							width: 1
						}
					},
					splitLine: {
						length: 12,
						lineStyle: {
							color: 'auto',
							width: 2
						}
					},
					axisLabel: {
						color: '#464646',
						fontSize: 20,
						distance: -60,
						formatter: function (value) {
							return '';
						}
					},
					title: {
						offsetCenter: [0, '-30%'],
						fontSize: 16
					},
					detail: {
						fontSize: 20,
						offsetCenter: [0, '-5%'],
						valueAnimation: true,
						formatter: function (value) {
							return value + '分';
						},
						color: 'auto'
					},
					tooltips: {
						
					},
					data: [{
						value: 15.2222,
						name: '温度评分'
					}]
				}]
			};
		},
		methods: {
			init(e){
				const { canvas, width, height } = e;
				const { val } = this.echartData;
				echarts.setCanvasCreator(() => canvas);
				const chart = echarts.init(canvas, null, {
					width: 326,
					height: 240
				});
				canvas.setChart(chart);
				(this.series[0].data[0])['value'] = val;
				//初始化echarts实例
				chart.setOption({ series: this.series });
			}
		}
	}
</script>

<style lang="less">
.gaguge-canvas{
	position: absolute;
	transform: translateY(-20px);
	width: 100%;
	height: 100%;
}
</style>
