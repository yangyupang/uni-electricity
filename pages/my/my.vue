<template>
	<view>
		<view class="my-user flex jc-between a-center">
			<view class="flex a-center">
				<view class="">
					<image class="user-pic" v-if="user" :src="user.avatarUrl" mode="" />
					<image v-else class="user-pic" src="../../static/images/admin.png" mode="" />
				</view>
				<view class="user-btn" v-if="user" @click="logon">
					{{user.nickName}}
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="user-btn" @getuserinfo="getUserInfo" open-type="getUserInfo" v-else>
					点击登录
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 || APP-PLUS -->
				<button class="user-btn" @click="gotoLogin" v-else>
					点击登录
				</button>
				<!-- #endif -->
			</view>
			<view>
				<uni-icons type="arrowright" color="white" size="30"></uni-icons>
			</view>
		</view>
		<uni-grid :column="3" @change="goto">
			<uni-grid-item v-for="(item,index) in myList" :index="index" :key="item.id">
				<view class="flex a-center jc-center t-center" style="height: 100%;">
					<view>
						<image class="mylist-pic" :src="item.img" mode=""></image>
						<view class="mylist-title">
							{{item.title}}
						</view>
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniIcons from '../../components/uni-ui/uni-icons/uni-icons.vue'
	import md5 from "md5"
	export default {
		components: {
			uniIcons,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				user: null,
				myList: [{
						img: "../../static/images/my/order.png",
						title: "我的订单",
						path: "none"
					},
					{
						img: "../../static/images/my/coupons.png",
						title: "优惠券",
						path: "none"
					},
					{
						img: "../../static/images/my/gift.png",
						title: "礼品卡",
						path: "none"
					},
					{
						img: "../../static/images/my/collect.png",
						title: "我的收藏",
						path: "/pages/collect/collect"
					},
					{
						img: "../../static/images/my/footprint.png",
						title: "我的足迹",
						path: "none"
					},
					{
						img: "../../static/images/my/VIP.png",
						title: "会员福利",
						path: "none"
					},
					{
						img: "../../static/images/my/address.png",
						title: "地址管理",
						path: "/pages/address/address"
					},
					{
						img: "../../static/images/my/security.png",
						title: "账号安全",
						path: "none"
					},
					{
						img: "../../static/images/my/service.png",
						title: "联系客服",
						path: "none"
					},
					{
						img: "../../static/images/my/help.png",
						title: "帮助中心",
						path: "none"
					},
					{
						img: "../../static/images/my/opinion.png",
						title: "意见反馈",
						path: "/pages/opinion/opinion"
					},
				]
			};
		},
		methods: {
			// #ifdef MP-WEIXIN
			getUserInfo(e) {
				if (e.detail.rawData) {
					this.user = JSON.parse(e.detail.rawData)
					const openId = md5(this.user.nickName + this.user.avatarUrl)
					uni.setStorageSync('openId',openId)
					uni.setStorageSync('user', {
						nickName: this.user.nickName,
						avatarUrl: this.user.avatarUrl
					})
					this.$api.getCartList(uni.getStorageSync('openId')).then(res => {
						if (res.data.data) {
							uni.setTabBarBadge({
								index: 3,
								text: String(res.data.data.length)
							})
						}
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "您未同意授权，无法获取用户信息",
						duration: 800
					})
				}
			},
			//#endif
			// #ifdef APP-PLUS || H5
			gotoLogin() {
				this.user = {
					avatarUrl: 'https://avatars1.githubusercontent.com/u/55611024?s=460&u=ec3b68ce653f100c739b981cd2344b235b4e191d&v=4',
					nickName: 'yangyupang'
				}
				const openId = md5(this.user.nickName + this.user.avatarUrl)
				uni.setStorageSync('openId',openId)
				uni.setStorageSync('user', {
					nickName: this.user.nickName,
					avatarUrl: this.user.avatarUrl
				})
				this.$api.getCartList(uni.getStorageSync('openId')).then(res => {
					if (res.data.data) {
						uni.setTabBarBadge({
							index: 3,
							text: String(res.data.data.length)
						})
					}
				})
			},
			// #endif
			logon() {
				uni.showModal({
					title: '退出登录',
					content: '是否退出登录',
					success: (res) => {
						if (res.confirm) {
							this.user = null
							uni.removeStorageSync('user')
							uni.removeStorageSync('local')
							uni.removeStorageSync('address')
							uni.removeTabBarBadge({
								index: 3
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			goto(e) {
				if(uni.getStorageSync('user')){
					let url = this.myList[e.detail.index].path
					if (url === 'none') {
						uni.showToast({
							icon: "none",
							title: "开发中，敬请期待",
							duration: 800
						})
					} else {
						uni.navigateTo({
							url
						})
					}
				}else {
					uni.showToast({
						icon: "none",
						title: "请先登录",
						duration: 800
					})
				}

			}
		},
		onShow() {
			if (uni.getStorageSync('user')) {
				this.user = uni.getStorageSync('user')
			}
		}
	}
</script>

<style lang="scss">
	.my-user {
		height: 200rpx;
		background: #ab212c;
		padding: 0 20rpx;

		.user-pic {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
		}

		.user-btn {
			&::after {
				border: none;
			}

			margin-left: 30rpx;
			background: none;
			border: none;
			color: white;
		}
	}

	.mylist-pic {
		width: 60rpx;
		height: 60rpx;
	}

	.mylist-title {
		font-size: 26rpx;
		margin-top: 10rpx;
	}
</style>
