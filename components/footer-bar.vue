<template>
	<view class="footer-bar">
		<view class="footer-button" :class="{ 'footer-button--active': active == item.index }"
				v-for="(item, index) in buttons" :key="index" @tap="changeActived(item)">
			<view class="button-icon">
				<van-icon class="icon" :name="item.icon" size="24px"></van-icon>
			</view>
			<view class="button-label">{{item.label}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"footer-bar",
		data() {
			return {
				active: 0,
				buttons: [
					{ index: 0, label: "首页", icon: "wap-home", url: "" },
					{ index: 1, label: "历史记录", icon: "column", url: "" },
					{ index: 2, label: "个人信息", icon: "manager", url: "" }
				]
			};
		},
		methods:{
			changeActived(item){
				const { index } = item;
				this.active = index;
			}
		}
	}
</script>

<style lang="less">
.footer-bar{
	position: fixed;
	display: flex;
	box-sizing: border-box;
	flex-direction: row;
	flex-wrap: wrap;
	bottom: 0;
	left: 0;
	width: 100%;
	border-top: 1px solid #d9d9d9;
	padding: 8rpx 28rpx;
	text-align: center;
	color: #797979;
	.footer-button{
		flex: 1;
		.button-icon{
			.icon{}
		}
		.button-label{
			font-size: 14px;
		}
	}
}

.footer-button--active{
	color: #2d8cf0;
}
</style>
