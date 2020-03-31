<template>
	<view class="classification-container">
		<view class="position-re header-search" @click="goto('/pages/search/search')">
			<input class="header-input" placeholder="请输入关键字" type="text" value="">
			<image class="search-pic position-ab" src="../../static/images/search.png" mode="">
		</view>
		<view class="flex">
			<view class="classification-left">
				<classificationNav v-if="classificationList" @changeNav="changeNav" :navList="classificationList"></classificationNav>
			</view>
			<scroll-view scroll-y="true" :style="{height: rightHeight+'px'}" class="classification-right">
				<classificationList v-if="currentOne" :currentOne="currentOne"></classificationList>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import classificationNav from "../../components/classification/classificationNav.vue"
	import classificationList from "../../components/classification/classificationList.vue"
	export default {

		components: {
			classificationList,
			classificationNav
		},
		data() {
			return {
				classificationList: null,
				currentOne: null,
				rightHeight: 0
			};
		},
		methods: {
			changeNav(id) {
				this.$api.getCurrentClassification(id).then(res => {
					this.currentOne = res.data.data.currentOne
				})
			},
			getClassificationList() {
				this.$api.getClassificationList().then(res => {
					this.classificationList = res.data.categoryList
					this.changeNav(this.classificationList[0].id)
				})
			},
			adaptive() {
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select(".classification-right").boundingClientRect(data => {
						this.rightHeight = uni.getSystemInfoSync().windowHeight - data.top
					}).exec();
				})
			},
			goto(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onLoad() {
			this.getClassificationList()
			this.adaptive()
		}
	}
</script>

<style lang="scss">
	.classification-container {
		overflow: hidden;
		height: 100%;
	}

	.header-search {
		width: 100%;

		.header-input {
			margin: 20rpx;
			height: 40upx;
			border-radius: 20rpx;
			text-indent: 50rpx;
			font-size: 28rpx;
			padding: 10rpx 0;
			background: #f7f8fa;
		}

		.search-pic {
			top: 50%;
			margin-top: -18rpx;
			left: 30rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.classification-left {
		width: 160rpx;
	}

	.classification-right {
		width: 590rpx;
		height: 100%;
		overflow-y: scroll;
	}
</style>
