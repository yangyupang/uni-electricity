<template>
	<view>
		<u-parse :content="content" @navigate="navigate"></u-parse>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				content: null
			}
		},
		methods: {
			getProjectDetails(id) {
				this.$api.getProjectDetails(id).then(res => {
					if (res.status === 200) {
						this.content = res.data.data.content
						console.log(this.content);
					}

				})
			},
			navigate() {
				console.log(1);
			}
		},
		onLoad(options) {
			this.getProjectDetails(options.id)
		}
	}
</script>

<style scoped lang="scss">
	.topic-detail {
		width: 100%;

		/deep/ img {
			width: 750rpx;
		}
	}
</style>
