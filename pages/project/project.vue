<template>
	<view class="topic-container">
		<view class="t-center topic-each" v-for="item in topicList" :key="item.id" @click="gotoDetail(item.id)">
			<image class="topic-pic" :src="item.scene_pic_url" mode=""></image>
			<view class="title-size">
				{{item.title}}
			</view>
			<view class="subtitle">
				{{item.subtitle}}
			</view>
			<view style="color: red;" class="price-size">￥{{item.price_info}}元起</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				topicList: []
			};
		},
		methods: {
			getProject() {
				this.$api.getProject(this.page).then(res => {
					if (res.data.data.length > 0 && res.status === 200) {
						this.topicList.push(...res.data.data)
						this.page = this.page + 1
					} else {
						uni.showToast({
							icon: "none",
							title: "没有更多内容了哦",
							duration: 800
						})
					}
				})
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: `/pages/projectDetail/projectDetail?id=${id}`
				})
			}
		},
		onLoad() {
			this.getProject()
		},
		onReachBottom() {
			this.getProject()
		}
	}
</script>

<style lang="scss">
	.topic-pic {
		width: 100%;
		height: 400rpx;
	}

	.title-size {
		font-size: 30rpx;
	}

	.subtitle {
		color: #b8b8b8;
		margin: 10rpx;
		font-size: 26rpx;
	}

	.price-size {
		font-size: 26rpx;
	}

	.topic-each {
		margin-bottom: 40rpx;
	}
</style>
