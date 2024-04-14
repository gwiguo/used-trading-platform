<template>
	<div class="cms-container">
		<div class="menu-container">
			<el-menu
				default-active="1"
				class="el-menu-vertical-demo"
				@select="handleSelectMenu"
			>
				<h1 class="cms-title">后台管理</h1>
				<el-menu-item index="1">
					<el-icon><icon-menu /></el-icon>
					<span>闲置管理</span>
				</el-menu-item>
				<el-menu-item index="2">
					<el-icon><icon-menu /></el-icon>
					<span>订单管理</span>
				</el-menu-item>
				<el-menu-item index="3">
					<el-icon><document /></el-icon>
					<span>用户管理</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="right-container">
			<el-row class="header-container">
				<el-col :span="24">
					<el-button type="primary" @click="handleLogOut"
						>退出登录</el-button
					>
				</el-col>
			</el-row>
					<el-card class="table-container">
						<el-table
							:data="tableData"
							height="800"
							style="width: 100%"
							v-loading="tableLoading"
							element-loading-text="Loading..."
							element-loading-spinner='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
						>
							<el-table-column
								v-for="(item, index) in tableColumn[
									currentMenuIndex
								]['columnList']"
								:key="index"
								:label="item.label"
								:width="item.width"
								:align="item.align">
								<template #default="scope">
									<template v-if="item.prop == 'goods_cover'">
										<el-image style="width: 100px; height: 100px" :src="scope.row[item.prop]" />
									</template>
									<template v-else>										
										<template v-if="item.prop == 'order_status'">
											<el-tag :type="scope.row[item.prop] == '待付款' ? 'danger' : 'success'" style="font-size: 16px;">{{ scope.row[item.prop] }}</el-tag>
										</template>								
										<template v-else-if="item.prop == 'pay_status' || item.prop == 'pay_status'">
											<el-tag :type="scope.row[item.prop] == '未支付' ? 'danger' : 'success'" style="font-size: 16px;">{{ scope.row[item.prop] }}</el-tag>
										</template>

										<template v-else-if="currentMenuIndex == 3">
											
											<template v-if="item.prop == 'avatar'">
												<el-image style="width: 100px; height: 100px" :src="scope.row[item.prop]" />
											</template>											
											<template v-else-if="item.prop == 'status'">
												<el-tag :type="scope.row[item.prop] === false ? 'danger' : 'success'" style="font-size: 16px;">{{ scope.row[item.prop] === true ? '正常':'封禁' }}</el-tag>
											</template>
											<template v-else>{{ scope.row[item.prop] }}</template>
											
										</template>

										<template v-else>{{ scope.row[item.prop] }}</template>
									</template>

								</template>
							</el-table-column>
							<el-table-column
								fixed="right"
								label="操作"
								width="120"
								align="center"
							>
								<template #default="scope">
									<el-button
										v-show="currentMenuIndex == 1"
										type="danger"
										link
										@click="deleteGoods(scope.row)"
										>删除</el-button
									>
									<el-button
										v-show="currentMenuIndex == 2"
										type="danger"
										link
										@click="deleteOrder(scope.row)"
										>删除</el-button
									>
									<el-button
										v-show="currentMenuIndex == 3 && scope.row.status === true"
										type="danger"
										link
										@click="setUserStatus(scope.row)"
										>封号</el-button
									>
									<el-button
										v-show="currentMenuIndex == 3 && scope.row.status === false"
										type="danger"
										link
										@click="setUserStatus(scope.row)"
										>解封</el-button
									>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination
							background
							layout="total,sizes,prev, pager, next, jumper"
							:total="paginationData.total"
							:page-sizes="[10, 20, 30, 40]"
							@current-change="handleCurrentChange"
							@size-change="handleSizeChange"
						>
						</el-pagination>
					</el-card>
			<!-- <el-row class="table-container">
				<el-col :span="12">
				</el-col>
			</el-row> -->
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import request from "@/utils/request.js";
import { Document, Menu as IconMenu } from "@element-plus/icons-vue";
import Cookies from "js-cookie";
const { proxy } = getCurrentInstance();
import { useMain } from "@/store/index.js";
const useStore = useMain();
const router = useRouter();

const tableLoading = ref(false);
const currentMenuIndex = ref(1);
const tableData = ref([]);
const tableColumn = reactive({
	1: {
		url: "/admin/getAllGoods",
		columnList: [
			{
				prop: "_id",
				label: "闲置编号",
				width: "260",
				align: "",
			},
			{
				prop: "publish_time",
				label: "发布日期",
				width: "240",
				align: "",
			},
			{
				prop: "title",
				label: "闲置名称",
				align: "",
			},
			{
				prop: "publish_user",
				label: "发布用户",
				width: "180",
				align: "",
			},
			{
				prop: "price",
				label: "价格",
				width: "80",
				align: "",
			},
		],
	},
	2: {
		url: "/admin/getAllOrder",
		columnList: [
			{
				prop: "_id",
				label: "订单编号",
				width: "260",
				align: "",
			},
			{
				prop: "goods_title",
				label: "闲置名称",
				// width: "180",
				align: "",
			},
			{
				prop: "create_time",
				label: "创建时间",
				width: "240",
				align: "",
			},
			{
				prop: "goods_cover",
				label: "闲置图片",
				width: "180",
				align: "",
			},
			{
				prop: "order_status",
				label: "订单状态",
				width: "100",
				align: "",
			},
			{
				prop: "pay_status",
				label: "支付状态",
				width: "100",
				align: "",
			},
			{
				prop: "goods_price",
				label: "价格",
				width: "80",
				align: "",
			},
		],
	},
	3: {
		url: "/admin/getAllUser",
		columnList: [
			{
				prop: "_id",
				label: "用户ID",
				width: "260",
				align: "",
			},
			{
				prop: "nickname",
				label: "用户名",
				width: "180",
				align: "",
			},
			{
				prop: "avatar",
				label: "头像",
				width: "240",
				align: "",
			},
			{
				prop: "status",
				label: "用户状态",
				width: "120",
				align: "",
			},
		],
	},
});

const deleteGoodsLoading = ref(false);
const deleteOrderLoading = ref(false);
const deleteBanUserLoading = ref(false);

const paginationData = reactive({
	pageNum: 1,
	pageSize: 20,
	total: 0,
});

onMounted(() => {
	getTableData();
});
const getTableData = () => {
	tableLoading.value = true;
	request({
		url: tableColumn[currentMenuIndex.value].url,
		params: {
			pageNum: paginationData.pageNum,
			pageSize: paginationData.pageSize,
		},
	})
		.then((res) => {
			console.log(res);
			if (res.code === 200) {
				tableData.value = res.list;
				paginationData.total = res.total;
			}
		})
		.finally(() => {
			tableLoading.value = false;
		});
};

const handleCurrentChange = (n) => {
	paginationData.pageNum = n;
	getTableData();
};
const handleSizeChange = (n) => {
	paginationData.pageSize = n;
	getTableData();
};

const deleteGoods = (row) => {
	ElMessageBox.confirm("确认删除该闲置?", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
		beforeClose: (action, instance, done) => {
			if (action === "confirm") {
				instance.confirmButtonLoading = true;
				instance.confirmButtonText = "删除中...";
				setTimeout(() => {
					instance.confirmButtonLoading = false;
					instance.confirmButtonText = "确认";
					done();
				}, 300);
			} else {
				done();
			}
		},
	})
		.then(() => {
			deleteGoodsLoading.value = true;
			request({
				url: "/admin/deleteGoods",
				method: "post",
				data: {
					_id: row._id,
				},
			})
				.then((res) => {
					if (res.code == 200) {
						getTableData()
						ElMessage({
							type: "success",
							message: "删除成功！",
						});
					} else {
						ElMessage({
							type: "error",
							message: "删除失败！",
						});
					}
				})
				.catch((err) => {
					ElMessage({
						type: "error",
						message: err,
					});
				})
				.finally(() => {
					deleteGoodsLoading.value = false;
				});
		})
		.catch(() => {});
};

const deleteOrder = (row) => {
	ElMessageBox.confirm("确认删除该订单?", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
		beforeClose: (action, instance, done) => {
			if (action === "confirm") {
				instance.confirmButtonLoading = true;
				instance.confirmButtonText = "删除中...";
				setTimeout(() => {
					instance.confirmButtonLoading = false;
					instance.confirmButtonText = "确认";
					done();
				}, 300);
			} else {
				done();
			}
		},
	})
		.then(() => {
			// deleteGoodsLoading.value = true;
			request({
				url: "/admin/deleteOrder",
				method: "post",
				data: {
					_id: row._id,
				},
			})
				.then((res) => {
					if (res.code == 200) {
						getTableData()
						ElMessage({
							type: "success",
							message: "删除成功！",
						});
					} else {
						ElMessage({
							type: "error",
							message: "删除失败！",
						});
					}
				})
				.catch((err) => {
					ElMessage({
						type: "error",
						message: err,
					});
				})
				.finally(() => {
					// deleteGoodsLoading.value = false;
				});
		})
		.catch(() => {});
};

const setUserStatus = (row) => {
	ElMessageBox.confirm("确认对该用户进行封号处理?", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning",
		beforeClose: (action, instance, done) => {
			if (action === "confirm") {
				instance.confirmButtonLoading = true;
				instance.confirmButtonText = "封号中...";
				setTimeout(() => {
					instance.confirmButtonLoading = false;
					instance.confirmButtonText = "确认";
					done();
				}, 300);
			} else {
				done();
			}
		},
	})
		.then(() => {
			// deleteGoodsLoading.value = true;
			request({
				url: "/admin/setUserStatus",
				method: "post",
				data: {
					_id: row._id,
					status:row.status
				},
			})
				.then((res) => {
					if (res.code == 200) {
						getTableData()
						ElMessage({
							type: "success",
							message: "操作成功！",
						});
					} else {
						ElMessage({
							type: "error",
							message: "操作失败！",
						});
					}
				})
				.catch((err) => {
					ElMessage({
						type: "error",
						message: err,
					});
				})
				.finally(() => {
					// deleteGoodsLoading.value = false;
				});
		})
		.catch(() => {});
};

const handleSelectMenu = (key, keyPath) => {
	currentMenuIndex.value = key;
	paginationData.pageNum = 1;
	paginationData.pageSize = 10;
	getTableData();
};

const handleLogOut = () => {
	proxy
		.$confirm("是否退出登录?", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
		.then(() => {
			useStore.clear();
			const logOutLoading = proxy.$loading({
				text: "Loading...",
				spinner:
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>',
			});
			setTimeout(() => logOutLoading.close(), 500);
			Cookies.remove("user_info");
			ElMessage({
				type: "success",
				message: "退出登录成功！",
			});
			router.push("/");
		})
		.catch(() => {});
};
</script>

<style lang="less" scoped>
.cms-container {
	display: flex;
	height: 100%;
	.menu-container {
		width: 200px;
		.el-menu-vertical-demo {
			height: 100%;
			padding-top: 10px;
			.el-menu-item {
				justify-content: center;
			}
			.cms-title {
				text-align: center;
				font-size: 24px;
				color: #409eff;
			}
		}
	}
	.right-container {
		flex: 1;
		.header-container {
			display: flex;
			align-items: center;
			padding: 0 40px;
			height: 60px;
			background: #fff;
			.el-col {
				text-align: right;
			}
		}
		.table-container {
			padding: 40px;
			margin: 0 auto;
			margin-top: 50px;
			width: 1400px;
			.el-table{
				font-size: 16px;
			}
		}
		.el-pagination {
			justify-content: center;
			margin-top: 20px;
		}
	}
}
</style>
