<template>
	<view class="collect-container">
		<view class="collect-top t-center">
			我的收藏
		</view>
		<view v-if="collectList.length>0" class="flex a-center flex-wrap jc-around">
			<good-box v-for="item in collectList" :key="item.id" :item="item"></good-box>
		</view>
		<view class="collect-msg t-center" v-else>
			暂无收藏
		</view>
	</view>
</template>

<script>
	import goodBox from "../../components/common/goodBox.vue"
	export default {
		components: {
			goodBox
		},
		data() {
			return {
				collectList: [],
				openId: ''
			};
		},
		methods: {
			getList() {
				this.$api.getCollectList(this.openId).then(res => {
					this.collectList = res.data.collectGoodsList
					// console.log(this.collectList);
				})
			}
		},
		onShow() {
			this.openId = uni.getStorageSync('openId')
			this.getList()
		}
	}
</script>

<style lang="scss">
	.collect-container {
		background: #F5F5F5;
		height: 100%;
	}

	.collect-top {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: white;
	}

	.collect-msg {
		padding-top: 50px;
		color: gray;
		background: white;
	}
</style>
