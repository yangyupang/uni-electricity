<template>
	<view v-if="addressForm">
		<view class="address-container">
			<view class="address-each">
				<input type="text" placeholder="姓名" v-model="addressForm.userName" />
			</view>
			<view class="address-each">
				<input type="text" placeholder="电话" v-model="addressForm.telNumber" />
			</view>
			<view class="address-each">
				<input type="text" @click="openAddress" disabled placeholder="省份/城市/区县" :value="addressForm.address" />
			</view>
			<view class="address-each">
				<input type="text" placeholder="详细地址/如楼道楼盘号等" v-model="addressForm.detailadress" />
			</view>
			<view class="address-checkbox">
				<label>
					<checkbox v-model="addressForm.checked" :checked="addressForm.checked" @click="changeChecked" /><text>设置为默认地址</text>
				</label>
			</view>
		</view>

		<view class="bottom-save position-ab t-center" @click="saveAddress">保存</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	export default {
		components: {
			simpleAddress
		},
		data() {
			return {
				addressForm :{
					address: '',
					addressId: '',
					checked: true,
					detailadress: '',
					telNumber: '',
					userName: ''
				},
				cityPickerValueDefault: [0, 0, 1],
				openId: ''
			}
		},
		methods: {
			changeChecked() {
				this.addressForm.checked = !this.addressForm.checked
			},
			getAddress(id) {
				this.$api.getOneAddress(id).then(res => {
					let add = res.data.data
					console.log(add);
					this.addressForm = {
						address: add.address,
						addressId: add.id,
						checked: add.is_default,
						detailadress: add.address_detail,
						telNumber: add.mobile,
						userName: add.name
					}
					console.log(this.addressForm);
				})
			},
			openAddress() {
				var index = this.$refs.simpleAddress.queryIndex(['四川省', '成都市', '温江区'], 'label');
				// console.log(index);
				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.addressForm.address = e.labelArr.join('');
			},
			saveAddress() {
				this.$api.getNewAddress({
					addressId: this.addressForm.addressId,
					checked: this.addressForm.checked,
					detailadress: this.addressForm.detailadress,
					address:this.addressForm.address,
					openId:this.openId,
					telNumber:this.addressForm.telNumber,
					userName:this.addressForm.userName
				}).then(res => {
					if (res.data.data) {
						uni.showToast({
							title: "操作成功",
							duration: 800
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/address/address"
							})
						}, 800)
					}
				})
			}
		},
		onLoad(options) {
			this.openId = uni.getStorageSync("openId")
			if (options.id) {
				this.getAddress(options.id)
			} 
			// else {
			// 	this.addressForm = {
			// 		address: '',
			// 		addressId: '',
			// 		checked: true,
			// 		detailadress: '',
			// 		telNumber: '',
			// 		userName: ''
			// 	}
			// }
		}
	}
</script>

<style>
	.address-container {
		padding: 0 20rpx;
	}

	.address-each {
		padding: 30rpx 0;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.address-checkbox {
		margin-top: 40rpx;
	}

	.bottom-save {
		bottom: 0;
		line-height: 100rpx;
		height: 100rpx;
		width: 100%;
		background: #ab212c;
		color: white;
	}
</style>
