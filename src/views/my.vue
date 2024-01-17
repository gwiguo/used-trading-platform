templat<template>
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
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="我发布的" name="publish">我发布的</el-tab-pane>
    <el-tab-pane label="我下架的" name="offshelf">我下架的</el-tab-pane>
    <el-tab-pane label="我收藏的" name="collect">我收藏的</el-tab-pane>
    <el-tab-pane label="我卖出的" name="sell">我卖出的</el-tab-pane>
    <el-tab-pane label="我买到的" name="buy">我买到的</el-tab-pane>
  </el-tabs>
	</div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import request from "@/utils/request.js";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";

const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);
const { proxy } = getCurrentInstance();
console.log(userInfo);
onMounted(async () => {
	await getOrderInfo();
});

const route = useRoute();
const router = useRouter();
let data = ref({});
let pageLoading = ref();

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
				user_id: userInfo.value._id,
				category: "买到的"
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
const activeName = ref('publish')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="less" scoped>
.top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
	padding: 20px;
	font-size: 20px;
	font-weight: bold;
    .left-container{        
        display: flex;
        align-items: center;
    }
    .nickname{
        margin-bottom: 20px;
    }
    .edit-address{
        margin-right: 50px;
    }
}
.block {
	width: 100%;
	height: 20px;
	background-color: rgb(246, 246, 246);
}
.content{
    padding: 20px;
}
</style>
