<template>
	<view>
		<view v-if="addressList.length>0">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="item in addressList" :key="item.id" :options="options(item.id)" @click="onClick">
					<view class="flex a-center addressList-each border-down" style="width: 100%;">
						<view>
							<radio :checked="item.checked" @click="change(item.id)" />
						</view>
						<view @click="changeAddress(item.id)">
							<view>{{item.name}},{{item.mobile}}</view>
							<view>
								{{item.address}}{{item.address_detail}}
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>

		</view>
		<view v-else>
			暂无地址信息
		</view>
		<view class="address-bottom position-ab flex jc-around t-center">
			<view class="bottom-left" @click="gotoAdd">
				+ 新建地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				addressList: [],
				openId:''
			};
		},
		methods: {
			getList() {
				this.$api.getAllAddress(this.openId).then(res => {
					this.addressList = res.data.data
					for (var i = 0, lenI = this.addressList.length; i < lenI; ++i) {
						const item = this.addressList[i]
						this.$set(item, 'checked', false)
						if (item.is_default) {
							item.checked = true
							uni.setStorageSync('address', JSON.stringify(item))
						}
					}
					if (!this.addressList.some(item => item.checked)) {
						this.addressList[0].checked = true
						uni.setStorageSync('address', JSON.stringify(this.addressList[0]))
					}
				})
			},
			changeAddress(id) {
				uni.navigateTo({
					url: `/pages/addressDetail/addressDetail?id=${id}`
				})
			},
			options(id) {
				return [{
					text: '删除',
					id,
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			},
			onClick(e) {
				uni.showToast({
					icon: "none",
					title: "暂无该接口",
					duration: 800
				})
			},
			change(id) {
				this.addressList.map(item => {
					if (item.id === id) {
						item.checked = true
						uni.setStorageSync('address', JSON.stringify(item))
					} else {
						item.checked = false
					}
				})
			},
			gotoAdd() {
				uni.navigateTo({
					url: "/pages/addressDetail/addressDetail"
				})
			},
		},
		onShow() {
			this.openId = uni.getStorageSync("openId")
			this.getList()
		}
	}
</script>

<style lang="scss">
	.addressList-each {
		padding: 20rpx;
	}

	.address-bottom {
		bottom: 0;
		margin: 20rpx 0;
		width: 100%;

		.bottom-left {
			width: 300rpx;
			padding: 10rpx;
			border: 2rpx solid #ab212c;
			color: #ab212c;
		}

		.bottom-right {
			width: 300rpx;
			padding: 10rpx;
			border: 2rpx solid #6b9368;
			color: #6b9368;
		}
	}
</style>
