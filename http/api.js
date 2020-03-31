import service from "./index.js"

function urlFormat(url) {
	return `http://49.233.66.125:1234/${url}`
}
export default {
	// 首页
	getIndex() {
		return service.get(urlFormat("index/index"))
	},
	// 专题
	getProject(page=1){
		return service.get(urlFormat(`topic/listaction?page=${page}`))
	},
	// 分类列表
	getClassificationList(){
		return service.get(urlFormat("category/indexaction"))
	},
	// 当前分类
	// 参数:id:分类id
	getCurrentClassification(id){
		return service.get(urlFormat(`category/currentaction?id=${id}`))
	},
	// 首页分类导航
	// 参数id: 分类导航id
	getCategoryNav(id){
		return service.get(urlFormat(`category/categoryNav?id=${id}`))
	},
	// 分类导航商品列表
	// 参数id: 分类导航id
	getCategoryGoods(id){
		return service.get(urlFormat(`goods/goodsList?categoryId=${id}`))
	},
	// 搜索相关
	// 参数:openId: 生成的openId
	//   - 包括默认关键字 搜索记录 热门搜索
	getSearchRelated(openId){
		return service.get(urlFormat(`search/indexaction?openId=${openId}`))
	},
	// 添加搜索历史
	// 参数: keyword:关键字 openId:生成的openId
	getAddSearch({
		keyword,openId
	}){
		return service.post(urlFormat("search/addhistoryaction"),{keyword,openId})
	},
	// 清空搜索记录
	// 参数:openId:生成的openId
	getEmptySearch({openId}){
		return service.post(urlFormat("search/clearhistoryAction"),{openId})
	},
	// 关键字搜索
	// 参数:keyword: 关键字
	getSearch(keyword){
		return service.get(urlFormat(`search/helperaction?keyword=${keyword}`))
	},
	// 首页制造商详情
	// 参数:id:制造商id
	getManufacturers(id){
		return service.get(urlFormat(`brand/detailaction?id=${id}`))
	},
	getGoodsList(type,sort){
		return service.get(urlFormat(`goods/goodsList?is${type}=1&order=${sort}`))
	},
	// // 查看全部新品:默认综合(get)
	// getAllNewProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isNew=1`))
	// },
	// // 全部新品升序排列
	// getUpNewProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isNew=1&order=asc`))
	// },
	// // 全部新品降序排列
	// getDownNewProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isNew=1&order=desc`))
	// },
	// // 查看全部人气推荐
	// getAllHotProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isHot=1`))
	// },
	// // 全部新品升序排列
	// getUpHotProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isHot=1&order=asc`))
	// },
	// // 全部新品降序排列
	// getDownHotProduct(){
	// 	return service.get(urlFormat(`goods/goodsList?isHot=1&order=desc`))
	// },
	// 商品详情
	// 参数:id 商品id openId:生成的openId
	getProductDetails({id,openId}){
		return service.get(urlFormat(`goods/detailaction?id=${id}&openId=${openId}`))
	},
	// 专题详情
	// 参数:id:专题id
	getProjectDetails(id){
		return service.get(urlFormat(`topic/detailaction?id=${id}`))
	},
	// 加入收藏,商品详情接口会返回是否收藏
	getIsCollect({goodsId,openId}){
		return service.post(urlFormat(`collect/addcollect`),{goodsId,openId})
	},
	// 查看收藏
	getCollectList(openId){
		return service.get(urlFormat(`collect/listAction?openId=${openId}`))
	},
	// 立即购买
	// 参数:allPrise:总价 goodsId:商品id openId: 生成的openId
	getOrder({allPrise,goodsId,openId}){
		return service.post(urlFormat(`order/submitAction`),{allPrise,goodsId,openId})
	},
	// 购买详情
	// 参数: openId: 生成的openId addressId: 地址id
	getOrderDetail({openId,addressId}){
		return service.get(urlFormat(`order/detailAction?openId=${openId}&addressId=${addressId}`))
	},
	// 新增地址
	// 修改地址 同新增地址一样 addressId传地址id
	// 参数: address(省市区) addressId: '' checked:是否默认 detailadress: 地址详情 openId: 生成的openId telNumber:电话 userName: 姓名
	getNewAddress({addressId,checked,detailadress,address,openId,telNumber,userName}){
		return service.post(urlFormat("address/saveAction"),{addressId,checked,detailadress,address,openId,telNumber,userName})
	},
	// 获取全部地址
	getAllAddress(openId){
		return service.get(urlFormat(`address/getListAction?openId=${openId}`))
	},
	// 单个地址详情
	// 参数: id: 地址id
	getOneAddress(id){
		return service.get(urlFormat(`address/detailAction?id=${id}`))
	},
	// 加入购物车(post): cart/addCart  参数: goodsId:商品id number:数量 openId:生成的openId
	getAddCart({goodsId,number,openId}){
		return service.post(urlFormat(`cart/addCart`),{goodsId,number,openId})
	},
	// 查看购物车(get): cart/cartList?openId= 参数: openId: 生成的openId

	getCartList(openId){
		return service.get(urlFormat(`cart/cartList?openId=${openId}`))
	},
	
	// 删除购物车(get): cart/deleteAction?id= 参数: 商品id
	getDeleteCartGoods(id){
		return service.get(urlFormat(`cart/deleteAction?id=${id}`))
	}
}