<template>
	<view>
		<image class="address-pic" src="/static/images/address.png" mode=""></image>
		<view class="address-info flex jc-between a-center" v-if="address">
			<view>
				<view class="flex jc-between">
					<view class="txt-hidden" style="width: 93.725px;">姓名：{{address.name}}</view>
					<view class="txt-hidden" style="width:177.150px">电话：{{address.mobile}}</view>
				</view>
				<view class="flex" style="margin-top: 10rpx;">
					<view class="is_default" v-if="address.is_default">
						默认
					</view>
					<view class="txt-hidden" style="width: 524rpx;">{{address.address}}{{address.address_detail}}</view> 
				</view>
			</view>
			<view @click="gotoChoose">
				<uni-icons type="arrowright" size="30"></uni-icons>
			</view>
		</view>
		<view v-else @click="gotoAdd" class="t-center">
			请添加地址
		</view>
	</view>
</template>

<script>
	import uniIcons from "../uni-ui/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		props: {
			address: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			gotoAdd() {
				uni.navigateTo({
					url: "/pages/addressDetail/addressDetail"
				})
			},
			gotoChoose() {
				uni.navigateTo({
					url: "/pages/address/address"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.address-info {
		padding: 30rpx;
	}

	.is_default {
		color: #ab212c;
		padding: 0 10rpx;
		margin-right: 10rpx;
		font-size: 24rpx;
		border: 2rpx solid #ab212c;
		line-height: 40rpx;
	}

	.address-pic {
		display: block;
		width: 100%;
		height: 20rpx;
	}
</style>
