<template>
	<view>
		<view class="flex a-center">
			<view class="flex input-sty a-center position-re">
				<view class="search-icon t-center">
					<image src="../../static/images/search.png" mode=""></image>
				</view>
				<input placeholder="请输入搜索内容"  @confirm="confirm" type="text" v-model="value" />
				<view v-if="show" @click="clear" class="clear-icon position-ab">
					<uni-icons color="#999999" class="" size="24" type="clear" />
				</view>
			</view>
			<view class="" @click="cancel">取消</view>
		</view>

		<view class="" v-if="results.length>0">
			<view class="reslut-box" v-for="item in results" :key="item.id" @click="gotoDetail(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="search-about" v-else>
			<view class="" v-if="historyData.length>0">
				<view class="flex jc-between">
					<view class="search-title">搜索历史</view>
					<view class="" @click="clearHistory">
						<uni-icons type="trash" size="20"></uni-icons>
					</view>
				</view>
				<view class="">
					<view class="search-each" @click="goSearch(item.keyword)" v-for="item in historyData" :key="item.id">
						{{item.keyword}}
					</view>
				</view>
			</view>
			<view class="">
				<view class="search-title">
					热门搜索
				</view>
				<view class="">
					<view class="search-each" @click="goSearch(item.keyword)" :class="[item.is_hot?'is_hot':'']" v-for="item in hotKeywordList"
					 :key="item.id">
						{{item.keyword}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "../../components/uni-ui/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				historyData: [],
				hotKeywordList: null,
				results: [],
				value: '',
				openId: '',
				show: true
			};
		},
		methods: {
			getSearchRelated() {
				this.$api.getSearchRelated(this.openId).then(res => {
					if (res.status === 200) {
						this.historyData = res.data.historyData
						this.hotKeywordList = res.data.hotKeywordList
					}
				})
			},
			clear() {
				this.value = ''
				this.results=[]
			},
			confirm(){
				this.$api.getSearch((this.value).trim()).then(res => {
					if (res.status === 200) {
						this.results = res.data.keywords
					}
					this.getAddSearch((this.value).trim())
				})
			},
			goSearch(keyword) {
				this.value = (keyword).trim()
				this.$api.getSearch(this.value).then(res => {
					if (res.status === 200) {
						this.results = res.data.keywords
					}
					this.getAddSearch((this.value).trim())
				})
			},
			getAddSearch(value) {
				this.$api.getAddSearch({
					keyword: value,
					openId: this.openId
				})
			},
			clearHistory() {
				uni.showModal({
					title: '清除记录',
					content: '是否清除历史浏览记录',
					success: (res) => {
						if (res.confirm) {
							this.$api.getEmptySearch({openId:this.openId}).then(res => {
								if (res.status === 200) {
									this.historyData = []
									uni.showToast({
										title: res.data.data,
										duration: 800
									});
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								icon: "none",
								title: "您已取消清除记录",
								duration: 800
							});
						}
					}
				});
			},
			cancel() {
				this.value = ''
				this.results=[]
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: `/pages/goodsDetail/goodsDetail?id=${id}`
				})
			}
		},
		watch: {
			value(val) {
				// console.log(val);
				if (val === '') {
					this.getSearchRelated()
					this.results=[]
				} else {
					this.goSearch(val)
				}
			}
		},
		onLoad() {
			this.openId = uni.getStorageSync('openId')
			this.getSearchRelated()
		}
	}
</script>

<style lang="scss">
	.input-sty {
		margin: 20rpx 20rpx;
		padding: 10rpx 0;
		background-color: #F4F4F4;
		width: 640rpx;

		.search-icon {
			width: 80rpx;
			line-height: 20rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.clear-icon {
			right: 0px;
			top: 0;
			width: 30px;
			text-align: center;
		}
	}

	.reslut-box {
		margin: 40rpx 20rpx;
	}

	.search-about {
		margin: 20rpx;

		.search-title {
			margin-bottom: 10rpx;
		}

		.search-each {
			font-size: 24rpx;
			padding: 10rpx;
			display: inline-block;
			border: 1rpx solid #ededed;
			margin: 10rpx;

		}

		.is_hot {
			color: red;
			border: 1rpx solid red;
		}
	}
</style>
