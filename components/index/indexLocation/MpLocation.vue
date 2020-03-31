<template>
	<view class="location-container">
		<view class="txt-hidden" v-if="location">
			{{location}}
		</view>
		<view class="txt-hidden" v-else>
			获取定位中...
		</view>
	</view>
</template>

<script>
	import QQMapWX from "../../../static/js/qqmap-wx-jssdk.js";
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				location:''
			}
		},
		methods: {
			getAuthorize() {
				uni.authorize({
					scope: 'scope.userLocation',
					success: () => {
						this.getLocation()
					},
					fail: (err) => {
						this.openModel()
					}
				})
			},
			oNPermissions() {
				uni.showModal({
					title: '特别提醒',
					content: '若不授权，则无法正常使用该程序',
					success: (res) => {
						if (res.confirm) {
							this.openSetting()
						} else if (res.cancel) {
							this.oNPermissions()
						}
					}
				});
			},
			openModel() {
				uni.showModal({
					title: '特别提醒',
					content: '需要授权打开位置定位服务',
					success: (res) => {
						if (res.confirm) {
							this.oNPermissions()
						} else if (res.cancel) {
							this.oNPermissions()
						}
					}
				});
			},
			//打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			openSetting() {
				// 打开小程序的设置
				// #ifdef MP-WEIXIN
				uni.openSetting({
					success: (res) => {
						let flag = res.authSetting['scope.userLocation']
						if (flag) {
							this.getLocation()
						} else {
							this.oNPermissions()
						}
					},
				});
				// #endif
			},
			getLocation() {
				// console.log("我在获取呢");
				const qqmapsdk = new QQMapWX({
					key: "UW7BZ-V47YD-H664N-HEGJR-25YR5-XNFBJ"
				});
				// console.log(qqmapsdk.reverseGeocoder);
				uni.getLocation({
					type: "gcj02", //  wgs84: 返回GPS坐标，gcj02: 返回国测局坐标
					success: (res) => {
						// console.log(res);
						const {
							latitude,
							longitude
						} = res;
						const location = {
							latitude,
							longitude
						};
						qqmapsdk.reverseGeocoder({
							sig: 'Z7EDwzuamgX2nTRLEyh0rR8BXHIcVvHM',
							location,
							success: (res) => {
								// console.log(res.result)
								this.location = res.result.address
								uni.setStorageSync('local', {
									latitude: res.result.location.lat,
									longitude: res.result.location.lng,
									location: res.result.address
								})
							},
							fail: (res) =>{
								uni.showToast({
									title: '定位失败',
									duration: 2000,
									icon: "none"
								})
								console.log(res);
							},
						})
					},
					fail: (err) => {
						console.log(err);
					}
				});

			}
		},
		mounted() {
			this.getAuthorize()
		}
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
