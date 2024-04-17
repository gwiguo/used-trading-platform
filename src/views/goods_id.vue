<template>
	<div class="top-container">
		<div class="left-container">
			<el-avatar shape="square" :size="100" :src="data?.user_avatar" />
			<div style="margin-left: 20px">
				<h3>{{ data?.publish_user }}</h3>
				<p class="publish-time">发布时间：{{ data?.publish_time }}</p>
			</div>
		</div>
		<div class="right-container">
			<div class="price">￥{{ data?.price }}</div>
			<el-button v-if="userInfo._id!=data.publish_user_id" type="danger" plain size="large" :icon="Goods"
				:loading="buyLoading" @click="handleClickWantToBy">我想要</el-button>
			<el-button
				v-if="userInfo._id!=data.publish_user_id"
				type="primary"
				plain
				size="large"
				:icon="isCollected"
				@click="collectOperate"
				:loading="collectLoading"
			>
				{{ collectBtnText }}
			</el-button>
		</div>
	</div>
	<div class="block"></div>
	<div class="content-container">
		<div class="content">
			<h1>{{ data?.title }}</h1>
			<p style="font-size: 20px">{{ data?.desc }}</p>
			<el-image v-for="image in data?.images" :key="image" :src="image" fit="contain" />
		</div>
		<div class="block"></div>
		<div
			class="comment"
			v-loading="cmtLoading"
			element-loading-text="Loading..."
			element-loading-spinner='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
		>
			<h2>全部留言</h2>
			<div
				class="cmt-editor"
				:style="{ color: computedCmtContentColor }"
				ref="cmtEditor"
				contenteditable="true"
				@focus="cmtFocus"
				@blur="cmtBlur"
				@input="changeCmtContent"
			>
				{{ cmtContent }}
			</div>
			<div style="text-align: right">
				<el-button class="cmt-btn" type="primary" @click="sendCmt">发布留言</el-button>
			</div>
			<div class="cmt-list">
				<div class="cmt-item" v-for="cmt in cmtList" :key="cmt._id">
					<div class="top">
						<el-avatar :size="75" :src="cmt.avatar" />
						<div class="user-name">{{ cmt.nickname }}</div>
					</div>
					<div class="cmt-info">{{ cmt.content }}</div>
					<div class="cmt-time">{{ cmt.time }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/utils/request.js";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";
import { ElMessage } from "element-plus";
import { Star, StarFilled, Goods, Loading } from "@element-plus/icons-vue";

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);
import { formaDate } from "@/utils/utils.js";

const cmtEditor = ref(null);
const cmtContent = ref("欢迎参与留言~");
const cmtLoading = ref(false);
let data = ref({});
let pageLoading = ref();

onMounted(async () => {
	await getGoodsDetail();
	await getPersonal();
	await getCommentList();
});

const getGoodsDetail = () => {
	pageLoading = proxy.$loading({
		target: ".main",
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
	});
	return request({
				url: "/goods/getGoodsDetail",
				params: {
					_id: route.params.id
				}
			})
			.then(res => {
				if (res.code == 200) {
					data.value = res.data;
				}
			})
};

const collectData = ref([])
const getPersonal = () => {	
	return request({
		url: "/personal/getCollect",
		params: {
			user_id: userInfo.value._id
		}
	})
		.then(res => {
			if (res.code == 200) {
				collectData.value = res.data;
			}
		})
		.finally(() => {
			pageLoading.close();
		});
}

const cmtList = ref([]);
const getCommentList = () => {
	return new Promise((resolve, reject) => {
		cmtLoading.value = true;
		request({
			url: "/comment/getComment",
			params: {
				goods_id: data.value?._id
			}
		})
			.then(res => {
				// console.log(res);
				if (res.code == 200) {
					cmtList.value = res.data;
				}
			})
			.finally(() => {
				cmtLoading.value = false;
				resolve();
			});
	});
};

const handleClickWantToBy = () => {
	if (!userInfo.value.account) {
		ElMessage({
			type: "error",
			message: "请先登录！"
		});
	} else {
		buyLoading.value = true;
		request({
			url: "/order_api/createOrder",
			method: "post",
			data: {
				of_user_id:data.value.publish_user_id,
				user_id: userInfo.value._id,
				goods_id: route.params.id,
				goods_title: data.value.title,
				goods_desc: data.value.desc,
				category: "bought",
				create_time: formaDate(new Date()),
				pay_time: "",
				pay_status: "未支付",
				pay_way: "",
				order_status: "待付款",
				goods_price: data.value.price,
				goods_cover: data.value.images[0],
				mobile: "",
				address: "",
				name: "",
				address_detail: ""
			}
		}).then(res => {
			console.log(res);
			if (res.code == 200) {
				router.push(`/order/${res.data?.order_id}`);
			} else {
				ElMessage({
					type: "error",
					message: "数据库异常！"
				});
			}
		}).finally(()=>buyLoading.value = false);
	}
};

const collectOperate = () => {
	if (!userInfo.value.account) {
		ElMessage({
			type: "error",
			message: "请先登录！"
		});
	} else {
		collectLoading.value = true;
		request({
			url: "/personal/collect",
			method: "post",
			data: {
				user_id: userInfo.value._id,
				goods_id: route.params.id
			}
		}).then(res => {
			if (res.code == 200) {
				collectData.value = res.data;
				ElMessage({
					type: "success",
					message: res.data.includes(data.value?._id)
						? "收藏成功~"
						: "取消收藏~"
				});
			} else {
				ElMessage({
					type: "error",
					message: "数据库异常！"
				});
			}
		}).finally(()=>{			
			collectLoading.value = false;
		})
	}
};

const collectLoading = ref(false);
const buyLoading = ref(false)
const isCollected = computed(() => (collectData.value.includes(data.value?._id) ? StarFilled : Star));
const collectBtnText = computed(() => (collectData.value.includes(data.value?._id) ? "已收藏" : "收藏"));
const computedCmtContentColor = computed(() => (cmtContent.value === "欢迎参与留言~" ? "#ccc" : "#000"));

const changeCmtContent = e => {
	cmtContent.value = e.target.textContent.trim();
};

const cmtFocus = e => {
	if (cmtContent.value == "欢迎参与留言~") {
		cmtContent.value = "";
	}
};
const cmtBlur = e => {
	if (cmtContent.value == "") {
		cmtContent.value = "欢迎参与留言~";
	}
};

const sendCmt = () => {
	if (!userInfo.value.account) {
		return ElMessage({
			type: "error",
			message: "请先登录！"
		});
	}
	if (cmtContent.value == "欢迎参与留言~" || !cmtContent.value?.trim()) {
		return ElMessage({
			type: "error",
			message: "留言不能为空！"
		});
	}
	cmtLoading.value = true;
	request({
		url: "/comment/insertComment",
		method: "post",
		data: {
			goods_id: data.value._id,
			content: cmtContent.value,
			avatar: userInfo.value.avatar,
			comment_user_id:userInfo.value._id,
			reply_user_id:data.value.publish_user_id,
			nickname: userInfo.value.nickname,
			goods_cover: data.value.images[0],
			time: formaDate(new Date())
		}
	})
		.then(res => {
			if (res.code == 200) {
				getCommentList();
				cmtContent.value = "欢迎参与留言~";
				ElMessage({
					type: "success",
					message: "留言成功~"
				});
			}
		})
		.finally(() => {
			cmtLoading.value = false;
		});
};
</script>

<style lang="less" scoped>
.top-container {
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;

	.left-container {
		display: flex;

		.publish-time {
			color: #aaa;
		}
	}

	.right-container {
		display: flex;
		justify-content: space-between;
		align-items: center;

		// width: 330px;
		.price {
			margin-right: 20px;
			font-size: 32px;
			color: red;
			font-weight: bolder;
		}
	}
}

.block {
	width: 100%;
	height: 20px;
	background-color: rgb(246, 246, 246);
}

.content-container {
	overflow-y: auto;
	padding-top: 20px;
	height: calc(100% - 160px);

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-thumb {
		background: #79bbff; // 滑块颜色
		border-radius: 5px; // 滑块圆角
	}

	.content {
		padding: 0 40px;
		padding-bottom: 20px;
		min-height: 50%;

		h1 {
			margin-top: 0;
			font-size: 24px;
		}

		.el-image {
			margin: 10px 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.comment {
		padding: 0 40px 40px 40px;

		&::after {
			content: "";
			display: block;
			clear: both;
		}

		// background-color: #f66;
		.cmt-editor {
			padding: 15px 20px;
			height: 100px;
			background-color: #f8fafd;
			color: rgb(204, 204, 204);
			outline: none;
			border: #eaedf0 1px solid;
		}

		.cmt-btn {
			margin-top: 20px;
			margin-bottom: 20px;
			border-radius: 0;
		}

		.cmt-list {
			.cmt-item {
				margin-bottom: 20px;

				.top {
					.el-avatar {
						margin-right: 10px;
					}

					display: flex;
					align-items: center;
				}

				.cmt-info {
					margin-left: 85px;
				}

				.cmt-time {
					margin-left: 85px;
					margin-top: 20px;
					color: #999999;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
