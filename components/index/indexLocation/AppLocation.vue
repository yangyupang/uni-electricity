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
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				location: '',
				permisionID: 'android.permission.ACCESS_FINE_LOCATION'
			}
		},
		methods: {
			async requestAndroidPermission(permisionID) {
			    var result = await permision.requestAndroidPermission(permisionID)
			    if (result == 1) {
					this.getLocation()
			    } else if (result == 0) {
					permision.gotoAppPermissionSetting()
			    } else {
					permision.gotoAppPermissionSetting()
			    }
			},
			//打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			openSetting() {
				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') { //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') { //安卓
							let main = plus.android.runtimeMainActivity();
							let Intent = plus.android.importClass("android.content.Intent");
							let mIntent = new Intent('android.settings.ACTION_SETTINGS');
							main.startActivity(mIntent);
						}
						console.log(res);
					}

				});
				// #endif
			},
			getLocation() {
				const qqmapsdk = new QQMapWX({
					key: "UW7BZ-V47YD-H664N-HEGJR-25YR5-XNFBJ"
				});
				uni.getLocation({
					type: "gcj02", //  wgs84: 返回GPS坐标，gcj02: 返回国测局坐标
					success: (res) => {
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
								this.location = res.result.address
								uni.setStorageSync('local', {
									latitude: res.result.location.lat,
									longitude: res.result.location.lng,
									location: res.result.address
								})
							},
							fail: function(res) {
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
						// uni.showModal({
						// 	title: '温馨提示',
						// 	content: '暂未开启位置授权,请开启',
						// 	confirmText: '去设置',
						// 	success:(res)=> {
						// 		if (res.confirm) {
						// 			//打开授权设置
						// 			this.openSetting()
						// 		} else if (res.cancel) {
						// 			uni.showToast({
						// 				title: "未打开位置授权，某些功能将无法使用",
						// 				icon: "none"
						// 			})
						// 			setTimeout(()=>{
						// 				this.callbackLocation()
						// 			},3000)
						// 		}
						// 	}
						// })
					}
				});
			},
			// callbackLocation() {
			// 	// console.log('111')
			// 	this.chooseLocation()
			// },
			// //打开授权设置（必须用户点击小程序才能打开授权设置，所以前面加了showModel）
			// openSetting() {
			// 	// App跳转系统的设置界面
			// 	// #ifdef APP-PLUS
			// 	uni.getSystemInfo({
			// 		success(res) {
			// 			if (res.platform == 'ios') { //IOS
			// 				plus.runtime.openURL("app-settings://");
			// 			} else if (res.platform == 'android') { //安卓
			// 				let main = plus.android.runtimeMainActivity();
			// 				let Intent = plus.android.importClass("android.content.Intent");
			// 				let mIntent = new Intent('android.settings.ACTION_SETTINGS');
			// 				main.startActivity(mIntent);
			// 			}
			// 		}
			// 	});
			// 	// #endif
			// }
		},
		mounted() {
			// this.requestAndroidPermission(this.permisionID)
			this.getLocation()
		}
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
