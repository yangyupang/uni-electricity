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
				location: ''
			}
		},
		methods: {
			getLocation() {
				const qqmapsdk = new QQMapWX({
					key: "UW7BZ-V47YD-H664N-HEGJR-25YR5-XNFBJ"
				});
				uni.getLocation({
					type: "gcj02",
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
								console.log(res.result)
								this.location = res.result.address
								uni.setStorageSync('local', {
									latitude: res.result.location.lat,
									longitude: res.result.location.lng,
									location: res.result.address
								})
							}
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		},
		mounted() {
			this.getLocation()
		}
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
