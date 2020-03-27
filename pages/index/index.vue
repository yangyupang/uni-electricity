<template>
	<view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getProject(){
				this.$api.getAddSearch({keyword:"沙发",openId:"yyp1998"}).then(res=>{
					console.log(res);
				}).catch(err =>{
					console.log(err);
				})
			}
		},
		onLoad() {
			this.getProject()
		}
	}
</script>

<style>
</style>
