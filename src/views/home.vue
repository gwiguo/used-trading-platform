<template>
	<div class="wrap">
		<div class="tab-list">
			<div
				class="tab-item"
				v-for="(tab, index) in tabList"
				:key="tab"
				:class="{ cur: tabVal == tab }"
				@click="changeTab(tab)"
				:style="index === 0 && tabVal == tab ? 'border-left-color:transparent;' : ''"
			>
				{{ tab }}
			</div>
		</div>
		<div class="content">
			<div class="item-list">
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					>
						<template #placeholder>
							<div class="image-slot">
								<el-icon size="36"><Loading /></el-icon>
							</div>
						</template>
					</el-image>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					/>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					/>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					/>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					/>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
				<div class="item">
					<el-image
						src="https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
						fit="contain"
					/>
					<div class="info-box">
						<p class="title">95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm</p>
						<div class="text">
							<span class="price">￥5500</span>
							<span class="location">广州市</span>
						</div>
						<p class="time">2023-12-23 00:00:00</p>
						<div class="user-wrap">
							<el-avatar
								shape="square"
								:size="30"
								src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64"
							/>
							<span class="user-name">我是谁</span>
						</div>
					</div>
				</div>
			</div>
			<el-pagination background layout="prev, pager, next, jumper" :total="1000"> </el-pagination>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import request from "@/utils/request.js";

const tabList = ["全部", "数码", "家电", "户外", "图书", "其它"];

const tabVal = ref("全部");

onMounted(() => {
	request({
		url: "http://localhost:3000/queryUser",
		method: "post"
	}).then(res => {
		console.log(res);
	});
});

const changeTab = tab => {
	tabVal.value = tab;
};
</script>

<style lang="less" scoped>
.wrap {
	margin-top: 20px;
	:deep(.el-tabs__header) {
		user-select: none;
	}

	border: 1px solid #dcdfe6;

	.tab-list {
		display: flex;
		box-sizing: border-box;
		height: 39px;
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
		padding: 30px;
		background-color: #fff;
		.item-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-bottom: 20px;
			.item:nth-child(n + 6) {
				margin-top: 30px;
			}
			.item:nth-child(n + 5) {
				margin-right: 0;
			}
			.item {
				// box-sizing: border-box;
				margin-right: 40px;
				width: 233px;
				border: 1px solid #e9e9eb;
				.el-image {
					width: 233px;
					height: 200px;
					.image-slot {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						background: var(--el-fill-color-light);
						color: var(--el-text-color-secondary);
						font-size: 14px;
					}
				}
				.info-box {
					box-sizing: border-box;
					width: 100%;
					padding: 10px;
					.title {
						width: 100%;
						display: -webkit-box;
						word-break: break-all;
						font-size: 20px;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.text {
						display: flex;
						justify-content: space-between;
						margin: 10px 0;
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
						margin-bottom: 10px;
						color: #909399;
					}
					.user-wrap {
						display: flex;
						align-items: center;
						.user-name {
							margin-left: 10px;
							color: #73767a;
						}
					}
				}
			}
		}
		.el-pagination {
			display: flex;
			justify-content: center;
		}
	}
}
</style>
