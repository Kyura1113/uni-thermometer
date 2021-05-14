<template>
	<view class="page">
		<grids/>
	</view>
</template>

<script>
	import grids from "@/components/grids.vue";
	export default {
		components:{
			grids
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goto(){
				uni.navigateTo({
					url: "/pages/thermometer/index"
				})
			}
		}
	}
</script>

<style>
	.page{
		/* box-sizing: border-box;
		background: #F9F9F9;
		padding: 20rpx 12rpx; */
	}
</style>
