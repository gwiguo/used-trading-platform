<template>
	<div class="top-container">
		<el-image class="goods-img" v-if="data?.goods_cover?.length" :src="data?.goods_cover" fit="cover" />
		<div class="info">
			{{ data.category == 'bought' ? "买到的" : data.category == 'sold' ? "卖出的" : "" }}：
			{{ data.goods_title }}
			<span class="price">￥{{ data.goods_price }}</span>
		</div>
	</div>
	<div class="block"></div>
	<div class="address-container">
		收货地址：{{ data.name }} {{ data.mobile }}
		<div class="address">{{ data.address }}{{ data.address_detail }}</div>
	</div>
	<div class="block"></div>
	<div class="order-container">
		<div class="order-title">订单信息（{{ data.order_status }}）：</div>
		<div class="order-id">编号：{{ data._id }}</div>
		<div class="pay-status">支付状态：  
			<el-tag class="ml-2" :type="data.pay_status == '未支付'? 'danger':'success'">{{ data.pay_status }}</el-tag>
</div>
		<div class="pay-way">支付方式：{{ data.pay_way }}</div>
		<div class="create-time">创建时间：{{ data.create_time }}</div>
		<div class="pay-time">支付时间：{{ data.pay_time }}</div>
		<div class="btn-group">
			<el-button type="danger" plain>取消订单</el-button>
			<el-button type="primary" plain @click="handleClickPay" v-if="data.pay_status == '未支付'">立即支付</el-button>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import request from "@/utils/request.js";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";

import { formaDate } from "@/utils/utils.js";

const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);
const { proxy } = getCurrentInstance();

onMounted(async () => {
	// await getGoodsDetail();
	await getOrderInfo();
});

const route = useRoute();
const router = useRouter();
let data = ref({});
let pageLoading = ref();

const getGoodsDetail = () => {
	pageLoading = proxy.$loading({
		target: ".main",
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
	});
	return new Promise((resolve, reject) => {
		request({
			url: "/goods/getGoodsDetail",
			params: {
				_id: route.params.id
			}
		})
			.then(res => {
				if (res.code == 200) {
					data.value = res.data;
					console.log(res);
				}
			})
			.finally(() => {
				resolve();
			});
	});
};

const getOrderInfo = () => {
	pageLoading = proxy.$loading({
		target: ".main",
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
	});
	return new Promise((resolve, reject) => {
		request({
			url: "/order_api/getOrderInfo",
			params: {
				_id: route.params.id,
				user_id: userInfo.value._id
			}
		})
			.then(res => {
				console.log(res);
				if (res.code == 200) {
					data.value = res.data;
				}
			})
			.finally(() => {
				resolve();
				pageLoading.close();
			});
	});
};

const handleClickPay = () => {	
	proxy
		.$confirm("模拟支付宝支付，是否确认支付?", "支付订单",{
			confirmButtonText: "支付",
			cancelButtonText: "取消",
			type: "warning"
		})
		.then(() => {
			pay()
		})
		.catch(() => {});
}

const pay = () => {
	request({
			url: "/order_api/payOrder",
			method:"post",
			data: {
				_id: route.params.id,
				pay_status:"已支付",
				pay_way:'支付宝',
				order_status:'待发货',
				pay_time: formaDate(new Date())
			}
		})
			.then(res => {
				if (res.code == 200) {
					ElMessage({
						type: "success",
						message: "支付成功！"
					});
					getOrderInfo()
				}else{
					ElMessage({
						type: "error",
						message: "支付失败~"
					});
				}
			})
			.finally(() => {

			});
}

</script>

<style lang="less" scoped>
.top-container {
	display: flex;
	padding: 40px;
	font-size: 24px;
	font-weight: bold;
	.goods-img {
		margin-right: 20px;
		width: 200px;
		height: 200px;
	}
	.price {
		color: red;
	}
}
.block {
	width: 100%;
	height: 20px;
	background-color: rgb(246, 246, 246);
}
.address-container {
	padding: 40px;
	font-size: 24px;
	font-weight: bold;
	line-height: 48px;
	.address {
		font-weight: normal;
		font-size: 22px;
	}
}
.order-container {
	padding: 40px;
	padding-bottom: 20px;
	line-height: 48px;
	.order-title {
		font-size: 24px;
	}
}
</style>
