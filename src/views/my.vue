<template>
	<div class="top-container">
		<div class="left-container">
			<el-avatar :size="150" :src="userInfo.avatar" />
			<div class="info">
				<div class="nickname">{{ userInfo.nickname }}</div>
				<el-button type="primary" plain>编辑资料</el-button>
			</div>
		</div>
		<el-button type="primary" plain class="edit-address">编辑收货地址</el-button>
	</div>
	<div class="block"></div>
	<div class="content">
		<el-tabs v-model="activeName" @tab-click="handleClickTab">
			<el-tab-pane label="我发布的" name="published">
				<div class="item-list">
					<div class="item" v-for="item in data.published" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div></div
			></el-tab-pane>
			<el-tab-pane label="我下架的" name="removed">
				<div class="item-list">
					<div class="item" v-for="item in data.removed" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div></div
			></el-tab-pane>
			<el-tab-pane label="我收藏的" name="collected">
				<div class="item-list">
					<div class="item" v-for="item in data.collected" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="我卖出的" name="sold">
				<div class="item-list">
					<div class="item" v-for="item in data.sold" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="我买到的" name="bought">
				<div class="item-list">
					<div class="item" v-for="item in data.bought" :key="item._id" @click="toOrderPage(item)">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }} {{ item.order_status }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, reactive } from "vue";
import { Loading } from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";

const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);
const { proxy } = getCurrentInstance();
const activeName = ref("bought");
console.log(userInfo);
onMounted(async () => {
	await getMyGoods();
});

// const filter = data => {
// 	console.log('------');
// 	console.log(data.value);
// 	console.log('------');

// 	return data.filter(item => item.category == activeName.value)
// }

const route = useRoute();
const router = useRouter();
let pageLoading = ref();
const data = reactive({
	bought: [],
	published: [],
	removed: [],
	sold: [],
	collected: []
});

const getMyGoods = () => {
	pageLoading = proxy.$loading({
		target: ".main",
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
	});
	return new Promise((resolve, reject) => {
		request({
			url: "/personal/getMyGoods",
			params: {
				_id: route.params.id,
				user_id: userInfo.value._id
			}
		})
			.then(res => {
				if (res.code == 200) {
					data.bought = res.data.filter(item => item.category == "bought");
					data.published = res.data.filter(item => item.category == "published");
					data.removed = res.data.filter(item => item.category == "removed");
					data.sold = res.data.filter(item => item.category == "sold");
					data.collected = res.data.filter(item => item.category == "collected");
				}
			})
			.finally(() => {
				resolve();
				pageLoading.close();
			});
	});
};
const handleClickTab = (tab, event) => {
	console.log(data[tab.paneName]);
};

const toOrderPage = item => {
	// console.log(item);
	router.push(`/order/${item._id}`);
};
</script>

<style lang="less" scoped>
.top-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	font-size: 20px;
	font-weight: bold;
	.left-container {
		display: flex;
		align-items: center;
	}
	.nickname {
		margin-bottom: 20px;
	}
	.edit-address {
		margin-right: 50px;
	}
}
.block {
	width: 100%;
	height: 20px;
	background-color: rgb(246, 246, 246);
}
.content {
	padding: 20px;
	.item-list {
		height: 550px;
		overflow-y: auto;
		.item {
			display: flex;
			margin-bottom: 20px;
			cursor: pointer;
			.el-image {
				flex: 0 0 auto;
				margin-right: 20px;
				width: 100px;
				height: 100px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 50%;
				overflow: hidden;
				.goods-title {
					font-weight: 600;
					margin-bottom: 10px;
					font-size: 14px;
				}
				.goods-desc {
					margin-bottom: 5px;
					color: #a8abb2;
					font-size: 14px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.create-time {
					margin-bottom: 5px;
					font-size: 14px;
				}
				.price {
					color: red;
				}
			}
		}
	}
}
</style>
