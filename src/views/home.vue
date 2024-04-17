<template>	
	<div class="wrap">
		<div class="tab-list">
			<div
				class="tab-item"
				v-for="(type, index) in typeList"
				:key="type"
				:class="{ cur: type == currentType }"
				@click="changeType(type)"
				:style="index === 0 && type == currentType ? 'border-left-color:transparent;' : ''"
			>
				{{ type }}
			</div>
		</div>
		<div
			class="content"
			v-loading="loading"
			element-loading-text="Loading..."
			element-loading-spinner='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
		>
			<div v-if="dataList.length" class="item-list">
				<div class="item" v-for="item in dataList" :key="item._id" @click="router.push('/item/' + item._id)">
					<el-image :src="item.images[0]" fit="cover">
						<template #placeholder>
							<div class="image-slot">
								<el-icon size="36"><Loading /></el-icon>
							</div>
						</template>
					</el-image>
					<div class="info-box">
						<p class="title">{{ item.title }}</p>
						<div class="text">
							<span class="price">￥{{ item.price }}</span>
							<span class="location">{{ item.location }}</span>
						</div>
						<p class="time">{{ item.publish_time }}</p>
						<div class="user-wrap">
							<el-avatar shape="square" :size="25" :src="item.user_avatar" />
							<span class="user-name">{{ item.publish_user }}</span>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-else-if="!loading && !dataList.length" image="/src/assets/images/empty.png" description=" " />
			<el-pagination
				v-if="dataList.length"
				background
				layout="prev, pager, next, jumper"
				:total="total"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";
import { useRouter } from "vue-router";

const router = useRouter();

const useStore = useMain();
const { search, currentType, dataList } = storeToRefs(useStore);
const typeList = ["全部", "数码", "家电", "户外", "图书", "其它"];
// const currentType = ref("全部");
const loading = ref(true);
const pageNum = ref(1);
const total = ref(0);
onMounted(() => {
	console.log("onMounted");
	getData();
});
// const dataList = ref([]);
const getData = () => {
	loading.value = true;
	request({
		url: "/goods/getGoods",
		params: {
			title: search.value,
			type: currentType.value,
			pageNum: pageNum.value
		}
	})
		.then(res => {
			console.log(res);
			if (res.code === 200) {
				dataList.value = res.list;
				total.value = res.total;
			}
		})
		.finally(() => {
			loading.value = false;
		});
};

const changeType = type => {
	useStore.updateType(type);
	getData();
};

const handleCurrentChange = n => {
	pageNum.value = n;
	getData();
};
</script>

<style lang="less" scoped>
.wrap {
	height: calc(100% - 2px);
	// height: 100%;
	:deep(.el-tabs__header) {
		user-select: none;
	}

	border: 1px solid #dcdfe6;

	.tab-list {
		display: flex;
		box-sizing: border-box;
		height: 39px;
		background-color: rgb(246, 246, 246);
		.tab-item {
			// margin-top: -1px;
			// margin-left: -1px;
			padding: 0 20px;
			// padding-right: 1px;
			// width: 74px;
			height: 38px;
			line-height: 38px;
			cursor: pointer;
			color: #909399;
			box-sizing: border-box;
			border: 1px solid transparent;
			user-select: none;
		}

		.cur {
			background-color: #fff;
			color: #409eff;
			border-left-color: #dcdfe6;
			border-right-color: #dcdfe6;
		}
	}

	.content {
		padding: 20px;
		// min-height: 800px;
		background-color: #fff;
		.item-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-bottom: 40px;
			// min-height: 800px;
			.item:nth-child(n + 6) {
				margin-top: 30px;
			}
			.item:nth-child(5),
			.item:nth-child(10) {
				margin-right: 0;
			}
			.item {
				// box-sizing: border-box;
				margin-right: 40px;
				width: 200px;
				// height: 385px;
				border: 1px solid #e9e9eb;
				cursor: pointer;
				.el-image {
					width: 180px;
					height: 180px;
					.image-slot {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						font-size: 14px;
					}
				}
				.info-box {
					box-sizing: border-box;
					width: 100%;
					padding: 10px;
					.title {
						width: 100%;
						height: 42px;
						display: -webkit-box;
						word-break: break-all;
						font-size: 16px;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.text {
						display: flex;
						justify-content: space-between;
						margin: 5px 0;
						.price {
							color: red;
							font-size: 20px;
						}
						.location {
							width: 50%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text-align: right;
						}
					}
					.time {
						margin-bottom: 5px;
						color: #909399;
					}
					.user-wrap {
						display: flex;
						align-items: center;
						.user-name {
							margin-left: 10px;
							color: #73767a;
							font-size: 14px;
						}
					}
				}
			}
		}
		.el-pagination {
			display: flex;
			justify-content: center;
		}
		:deep(.el-loading-text) {
			font-size: 18px;
		}
		:deep(.el-empty) {
			height: 840px;
			.el-empty__image {
				width: auto;
			}
		}
	}
}
</style>
