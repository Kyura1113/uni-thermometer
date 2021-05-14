<template>
	<view class="thermometer">
		<view class="upload-group" v-show="isComputed">
			<upload-form ref="upload_form"/>
			<view class="upload-computed">
				<van-button class="computed-button" type="primary" @tap="handleComputed()">开始计算</van-button>
			</view>
			<view class="upload-computed" v-if="resultList.length>0">
				<van-button class="back-button" type="primary" @tap="isComputed = !isComputed">返回</van-button>
			</view>
		</view>
		
		<van-transition name="slide-right" v-show="!isComputed">
			<view class="result-group">
				<view class="result-item" v-for="(item, index) in resultList" :key="index">
					<view class="result-date">{{ new Date() | timeFormat }}</view>
					<view class="result-form van-hairline--surround">
						<view class="result-header van-hairline--bottom">
							<view class="result-label">{{item.name}}</view>
							<view class="result-label-func">
								<view class="rename button">重命名</view>
								<view class="save button">保存</view>
								<view class="cancel button">删除</view>
							</view>
						</view>
						<view class="result-content">
							<view class="result-echart">
								<view class="result-legend van-hairline--surround">
									<view class="legend-row">
										<view class="legend-icon lowest-bg"></view>
										<text>: 全安排</text>
									</view>
									<view class="legend-row">
										<view class="legend-icon lower-bg"></view>
										<text>: 来八成</text>
									</view>
									<view class="legend-row">
										<view class="legend-icon middle-bg"></view>
										<text>: 先观望</text>
									</view>
									<view class="legend-row">
										<view class="legend-icon bigger-bg"></view>
										<text>: 留五成</text>
									</view>
									<view class="legend-row">
										<view class="legend-icon biggest-bg"></view>
										<text>: 快跑路</text>
									</view>
								</view>
								<gague-chart :echartData="item"/>
							</view>
							<view class="result-explain van-hairline--top">
								<view>一句话结论：建议<text :style="{'color':item.color}">{{item.advice}}</text></view>
							</view>
						</view>
					</view>
				</view>
				<view class="result-previous">
					<van-button class="previous-button" type="primary" @tap="handlePrevious()">再算一个</van-button>
				</view>
			</view>
		</van-transition>
	</view>
</template>

<script>
	import * as util from "./thermometer.js";
	import gagueChart from "@/components/gauge-chart.vue";
	import uploadForm from "@/components/upload-form.vue";
	
	
	
	export default {
		components: {
			gagueChart, uploadForm
		},
		data() {
			return {	
				resultList: [],
				isComputed: true,
			};
		},
		methods: {
			async handleUpload(item){
				const { index } = item;
				const { data, name } = await new Promise((resolve, reject)=>{
					wx.chooseMessageFile({
						count: 1,
						type: "file",
						success(res){
							const { path, name } = res.tempFiles[0];
							util.readCSVfile(path, (v)=>{
								resolve({ data: v, name: name});
							})
						}
					});
				});
				const temp = {
					...item,
					fileContent: data,
					fileName: name
				};
				this.$nextTick(function(){
					this.$set(this.uploadList, index, temp);
				});
			},
			handleComputed(){
				if(!this.uploadList[0].fileName || !this.uploadList[1].fileName) return console.log('failure');
				const { fileName } = this.uploadList[0];
				const name = `${fileName.split("_")[0]}(${fileName.split("_")[4]})`;  
				let result = util.currentTemperature(this.uploadList[0].fileContent, this.uploadList[1].fileContent);
				result = result ? result.toFixed(4) : result;
				
				const getFormData = (name, result) => {
					let obj = { name: name, val: result };
					if(result >= 50){
						return { ...obj, ...BASIC_DEFIND.BIGGEST_VAL };
					}else if(result >= 40 && result < 50){
						return { ...obj, ...BASIC_DEFIND.BIGGER_VAL };
					}else if(result >= 30 && result < 40){
						return { ...obj, ...BASIC_DEFIND.MIDDLE_VAL };
					}else if(result >= 10 && result < 30){
						return { ...obj, ...BASIC_DEFIND.LOWER_VAL };
					}else{ // result < 10:
						return { ...obj, ...BASIC_DEFIND.LOWEST_VAL };
					}
				}
				this.isComputed = false;
				this.resultList.unshift(getFormData(name, result));
			},
			handlePrevious(){
				this.isComputed = true;
				this.uploadList = [
					{ index: 0, label: "PE", fileContent: {}, fileName: "" },
					{ index: 1, label: "PB", fileContent: {}, fileName: "" }
				];
			},
			handleCancelFile(item){
				const { index } = item;
				this.uploadList[index].fileContent = {};
				this.uploadList[index].fileName = "";
			}
		}
	}
</script>

<style lang="less">
@import "@/assets/style/common.less";
.thermometer{
	margin: .p2r(18)[@rpx];
	.upload-form{
		.upload-label{
			background: #CFE6FF;
			height: .p2r(30)[@rpx];
			line-height: .p2r(30)[@rpx];
			text-align: center;
			color: #11635B;
			font-size: 20px;
		}
		.upload-content{
			display: flex;
			position: relative;
			box-sizing: border-box;
			height: .p2r(80)[@rpx];
			margin-bottom: .p2r(20)[@rpx];
			padding: 0 .p2r(12)[@rpx];
			align-items: center;
			justify-content: center;
			.upload-button{
				flex:1;
				width: .p2r(120)[@rpx];
				height: .p2r(48)[@rpx];
				line-height: .p2r(48)[@rpx];
				color: white;
				background: #7db7f5;
				font-size: 14px;
				text-align: center;
				border-radius: 4px;
				font-weight: bold;
			}
			.upload-file{
				flex:2;
				position: relative;
				height: .p2r(36)[@rpx];
				line-height: .p2r(36)[@rpx];
				margin-left: .p2r(12)[@rpx];
				border: 1px solid #d9d9d9;
				padding: 0 .p2r(4)[@rpx];
				width: 0;
				.upload-cancel{
					position: absolute;
					top:-12px;
					right:-6px;
					color: red;
				}
			}
		}
	}
	.upload-computed{
		width: 100%;
		text-align: center;
		.computed-button{
			background: #18ab9c;
			color: white;
			font-weight: bold;
		}
		.back-button{
			margin-top: .p2r(12)[@rpx];
			background: #18ab9c;
			color: white;
			font-weight: bold;
		}
	}
}
</style>
<style lang="less" scoped>
@import "@/assets/style/common.less";
.computed-button /deep/ .van-button {
	width: .p2r(188)[@rpx] !important;
	height: .p2r(72)[@rpx] !important;
	font-size: 18px !important;
	border-radius: 8px !important;
}	
.previous-button /deep/ .van-button {
	width: .p2r(188)[@rpx] !important;
	height: .p2r(72)[@rpx] !important;
	font-size: 18px !important;
	border-radius: 8px !important;
}
</style>
<style lang="less">
@import "@/assets/style/common.less";
.result-group{
	.result-item{
		margin-bottom: .p2r(8)[@rpx];
		.result-date{
			padding-left: .p2r(4)[@rpx];
			margin-bottom: .p2r(2)[@rpx];
			color: #a9a9a9;
			font-size: 12px;
		}
		.result-form{
			border-radius: 8px;
			.result-header{
				display: flex;
				position: relative;
				box-sizing: border-box;
				height: .p2r(30)[@rpx];
				line-height: .p2r(30)[@rpx];
				padding: 0 .p2r(12)[@rpx];
				.result-label{
					flex: 1;
					text-align: left;
					font-size: 14px;
				}
				.result-label-func{
					flex: 1;
					text-align: right;
					font-size: 12px;
					color: #2d8cf0;
					.button{
						display: inline-block;
						padding-left: .p2r(8)[@rpx];
					}
				}
			}
			.result-content{
				position: relative;
				box-sizing: border-box;
				align-items:center;
				justify-content: center;
				.result-echart{
					width: 100%;
					height: .p2r(120)[@rpx];
					.result-legend{
						position: absolute;
						right: 6px;
						top: 6px;
						padding: .p2r(4)[@rpx] .p2r(6)[@rpx];
						box-sizing: border-box;
						.legend-row{
							height: .p2r(12)[@rpx];
							line-height: .p2r(12)[@rpx];
							font-size: 8px;
							color: #808080;
							.legend-icon{
								height: .p2r(6)[@rpx];
								width: .p2r(6)[@rpx];
								display: inline-block;
								margin-right: .p2r(4)[@rpx];
							}
						}
					}
				}
				.result-explain{
					height: .p2r(24)[@rpx];
					line-height: .p2r(24)[@rpx];
					font-size: 12px;
					padding-left: .p2r(12)[@rpx];
				}
			}
		}
	}
}
.result-previous{
	width: 100%;
	text-align: center;
	margin-top: .p2r(18)[@rpx];
	.previous-button{
		background: #18ab9c;
		color: white;
		font-weight: bold;
	}
}
.lowest-bg{ background: #7CFFB2; }
.lower-bg{ background: #58D9F9; }
.middle-bg{ background: #FDDD60; }
.bigger-bg{ background: #fdab4d; }
.biggest-bg{ background: #FF5263; }
</style>