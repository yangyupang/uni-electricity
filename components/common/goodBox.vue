<template>
	<view class="">
	<view class="list-each t-center" @click="$gotoDetail('goodsDetail',item.id)">
		<image :src="item.list_pic_url" mode="" />
		<view class="list-name txt-hidden">
			{{item.name}}
		</view>
		<view style="color: red;" class="price-size">
			￥{{item.retail_price}}
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-each {
		height: 370rpx;
		width: 340rpx;
		margin: 30rpx 0;
		background-color: #FFFFFF;
	
		image {
			width: 240rpx;
			height: 240rpx;
		}
	
		.list-name {
			font-size: 26rpx;
			margin-top: 30rpx;
			padding: 0 10rpx;
		}
	
		.list-pic {
			margin-left: 20rpx;
			width: 30rpx;
			height: 30rpx;
			padding: 10rpx;
			border-radius: 50%;
			border: 5rpx solid #ededed;
		}
	}
	.price-size{
		font-size: 26rpx;
	}
</style>
