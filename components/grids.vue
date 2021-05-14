<template>
	<view class="grids">
		<view class="grid-container">
			<view class="grid-header van-hairline--bottom">{{basic.title}}</view>
			<view class="grid-content">
				<view class="grid-cell van-hairline--right van-hairline--bottom" 
						v-for="(item,index) in basic.modules" :key="index" @tap="handleRouteTo(item)">
					<view class="grid-icon">
						<van-icon class="icon" :name="item.icon" size="24px"></van-icon>
					</view>
					<view class="grid-label">{{item.label}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"grids",
		data() {
			return {
				basic: {
					title: "常用功能",
					modules: [
						{ label: "算温度", icon: "smile-comment", url: "/pages/thermometer/index" },
						{ label: "选驸马", icon: "goods-collect", url: "#" },
						{ label: "AU晴雨", icon: "umbrella-circle", url: "#" },
						{ label: "占用", icon: "clear", url: "#" },
					]
				}
			};
		},
		methods:{
			handleRouteTo(item){
				const { url } = item;
				console.log(url)
				uni.navigateTo({
					url: url ?? ""
				});
			}
		}
	}
</script>

<style lang="less">
.grids{
	margin: 18rpx 18rpx 0;
	.grid-container{
		border: 1px solid #f9f9f9;
		border-radius: 6px;
		margin-bottom: 20rpx;
		background: rgba(255, 255, 255, .7); 
		-webkit-backdrop-filter: blur(10px); 
		backdrop-filter: blur(10px);
		.grid-header{
			height: 44rpx;
			line-height: 44rpx;
			padding: 12px;
			font-size: 16px;
			//background: linear-gradient(346deg,#9ecdff 0%, #ffffff 100%);
		}
		.grid-content{
			display: flex;
			flex-wrap: wrap;
			.grid-cell{
				padding: 40rpx 0;
				flex: 1;
				width: 33.33%;
				max-width: 33.33%;
				min-width: 33.33%;
				text-align: center;
				.grid-icon{
					border-radius: 8px;
					background: #7DB7F5;
					width:50px;
					height:50px;
					line-height: 60px;
					margin: 0 auto;
					.icon{
						color: white;
					}
				}
				.grid-label{
					margin-top: 8rpx;
					line-height: 20px;
					font-size: 14px;
				}
				
			}
		}
	}
}
</style>
