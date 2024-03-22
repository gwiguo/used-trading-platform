<template>
	<header id="g-header">
		<div class="bg-wrap">
			<h1 @click="toHome">太平洋二手闲置交易平台</h1>
			<el-input
				v-model="searchVal"
				@keyup.enter.native="handleSearch"
				placeholder="搜闲置"
				class="input-search"
			>
				<template #append>
					<el-button :icon="Search" @click="handleSearch" />
				</template>
			</el-input>
			<el-button
				class="release-used-btn"
				type="primary"
				:icon="Plus"
				@click="toPublishPage"
				>发布闲置</el-button
			>
			<el-button class="message-btn" type="primary" :icon="ChatDotSquare"
				>消息</el-button
			>
			<div class="user-wrap" v-if="userInfo.nickname">
				<el-dropdown popper-class="user-dropdown">
					<div style="display: flex; outline: none">
						<p class="user-name">{{ userInfo.nickname }}</p>
						<el-avatar :size="50" :src="userInfo.avatar" />
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item :icon="User" @click="toMy"
								>个人中心</el-dropdown-item
							>
							<el-dropdown-item
								:icon="SwitchButton"
								@click="handleLogOut"
								>退出登录</el-dropdown-item
							>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<!-- <p class="user-name">{{ userInfo.nickname }}</p>
				<el-avatar :size="50" :src="userInfo.avatar" /> -->
			</div>
			<el-button
				text
				type="primary"
				class="login-btn"
				v-else
				@click="dialogVisible = true"
				>登录</el-button
			>
		</div>
	</header>
	<el-dialog
		v-model="dialogVisible"
		:before-close="handleClose"
		align-center
		class="login-dialog"
		:close-icon="CloseBold"
		@open="openDialogCallBack"
	>
		<div class="dialog-body">
			<div class="banner">
				<img src="../assets/images/login_banner.png" />
			</div>
			<div class="login">
				<div class="login-container">
					<h1>登录/注册</h1>
					<el-form :rules="rules" :model="account" ref="ruleFormRef">
						<el-form-item prop="name">
							<el-input
								v-model="account.name"
								:prefix-icon="User"
								placeholder="请输入账号"
								class="input-account"
								size="large"
								ref="nameInputRef"
							></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="account.password"
								show-password
								:prefix-icon="Lock"
								placeholder="请输入密码"
								class="input-password"
								size="large"
							></el-input>
						</el-form-item>
					</el-form>
					<!-- <div class="remember-password">
						<el-checkbox label="记住密码" name="remember" />
						<el-button type="primary" link>忘记密码</el-button>
					</div> -->
					<div class="btn-list">
						<el-button
							class="sign-in"
							type="primary"
							size="large"
							@click="handleClickLogin"
							:loading="loading"
							>登录</el-button
						>
						<el-button
							class="sign-up"
							size="large"
							@click="handleClickRegister(ruleFormRef)"
							:loading="registerLoading"
							>注册</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
import {
	Search,
	Plus,
	ChatDotSquare,
	CloseBold,
	User,
	Lock,
	SwitchButton,
} from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";
import Cookies from "js-cookie";

const { proxy } = getCurrentInstance();
// import SignInDialog from "./SignInDialog.vue";
const useStore = useMain();
const { userInfo } = storeToRefs(useStore);
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref(null);
const nameInputRef = ref(null);
const searchVal = ref("");
const loading = ref(false);
const registerLoading = ref(false);

// Cookies.get("user_info") && useStore.updateUserInfo(JSON.parse(Cookies.get("user_info")));

const handleSearch = () => {
	useStore.updateType("全部");
	useStore.updateSearch(searchVal.value);
	if (route.path !== "/") {
		router.push("/");
	} else {
		const pageLoading = proxy.$loading({
			target: ".wrap",
			text: "Loading...",
			spinner:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>',
		});
		request({
			url: "/goods/getGoods",
			params: {
				title: searchVal.value,
				type: useStore.currentType,
			},
		})
			.then((res) => {
				console.log(res);
				if (res.code === 200) {
					useStore.updateDataList(res.list);
				} else {
					useStore.updateDataList([]);
				}
			})
			.finally(() => {
				pageLoading.close();
			});
	}
};

const account = reactive({
	name: "test",
	password: "test",
});

const rules = {
	name: [
		{
			required: true,
			message: "请输入账号",
			trigger: "blur",
		},
		{
			pattern: /^[a-z0-9]{4,10}$/,
			message: "用户名必须是4-10个字母或者数字",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "请输入密码",
			trigger: "blur",
		},
		{
			pattern: /^[a-z0-9]{4,}$/,
			message: "密码必须是4位以上的字母或者数字",
			trigger: "blur",
		},
	],
};

const toPublishPage = () => {
	router.push("/publish");
};

const toMy = () => {
	router.push("/my");
};

const dialogVisible = ref(false);
const handleClose = (done) => {
	dialogVisible.value = false;
	ruleFormRef.value.resetFields();
};
const openDialogCallBack = () => {
	nextTick(() => {
		nameInputRef.value.focus();
	});
};

const handleClickLogin = () => {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			loading.value = true;
			request({
				url: "/login",
				method: "POST",
				data: {
					account: account.name,
					password: account.password,
				},
			}).then((res) => {
				if (res.code === 200) {
					if(res.data.status === false){
						return ElMessage({
							type: "error",
							message: "用户已被封禁！",
						});
					}
					getPersonal(res.data._id);
					ElMessage({
						type: "success",
						message: "欢迎登陆二手闲置交易平台~",
					});
					handleClose();
					Cookies.set("user_info", JSON.stringify(res.data));
					useStore.updateUserInfo(res.data);
					console.log(res.data);
				}
			}).finally(()=>{
				loading.value = false;
			})
		} else {
			return false;
		}
	});
};

const getPersonal = (user_id) => {
	return new Promise((resolve, reject) => {
		request({
			url: "/personal/getPersonal",
			params: {
				user_id,
			},
		})
			.then((res) => {
				console.log(res);
				if (res.code == 200) {
					useStore.updatePersonal(res.data);
				}
			})
			.finally(() => {
				resolve();
			});
	});
};

const toHome = () => {
	useStore.updateType("全部");
	router.push("/");
};

const handleClickRegister = async (formEl) => {
	if (!formEl) return;

	await formEl.validate((valid, fields) => {
		if (valid) {
			registerLoading.value = true;
			request({
				url: "/user/registerUser",
				method: "POST",
				data: {
					account: account.name,
					password: account.password,
				},
			})
				.then((res) => {
					console.log(res);
					if (res.code === 200) {
						ElMessage({
							type: "success",
							message: "用户注册成功！已自动为您登录~",
						});
						getPersonal(res.data._id);
						handleClose();
						Cookies.set("user_info", JSON.stringify(res.data));
						useStore.updateUserInfo(res.data);
					} else {
						ElMessage({
							type: "error",
							message: res.message,
						});
					}
				})
				.finally(() => {
					registerLoading.value = false;
				});
		} else {
			console.log("error submit!", fields);
		}
	});
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

const closeSignInDialog = () => {
	SignInDialogVisible.value = false;
};

const handleClickSignInBtn = () => {
	SignInDialogVisible.value = true;
	console.log(SignInDialogVisible.value);
};

</script>

<style lang="less" scoped>
#g-header {
	background-color: #fff;
	.bg-wrap {
		display: flex;
		align-items: center;
		padding: 10px 0;
		margin: 0 auto;
		width: 1200px;
	}
	h1 {
		flex: 0 0 auto;
		margin: 0;
		color: #409eff;
		font-size: 36px;
		cursor: pointer;
	}
	.input-search {
		margin-left: 65px;
		width: 450px;
		height: 42px;
	}
	.release-used-btn {
		margin-left: 40px;
		height: 42px;
	}
	.message-btn {
		margin-left: 30px;
		height: 42px;
	}
	.login-btn {
		margin-left: auto;
		font-weight: 600;
	}
	.user-wrap {
		display: flex;
		margin-left: 30px;
		user-select: none;
		cursor: pointer;
		.user-name {
			width: 100px;
			text-align: right;
			color: #409eff;
			line-height: 50px;
		}
		.el-avatar {
			margin-left: 10px;
		}
	}
}
// 登录/注册弹窗
.login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.login-container {
		width: 300px;
		margin-left: 60px;
		h1 {
			text-align: center;
			color: #000;
			margin-top: 0;
			margin-bottom: 60px;
		}
		.el-form {
			margin-bottom: 30px;
		}
		.remember-password {
			text-align: right;
			padding: 0 10px;
			height: 3em;
			background-color: #fff;
			:deep(.el-checkbox__label) {
				font-size: 16px;
			}
		}
		.btn-list {
			display: flex;
			justify-content: center;
			.el-button {
				padding-left: 40px;
				padding-right: 40px;
				font-size: 14px;
				border-radius: 50px;
			}
			.sign-up {
				margin-left: 20px;
			}
		}
	}
}
.login-dialog {
	.dialog-body {
		display: flex;
		align-items: center;
		.banner img {
			width: 500px;
			height: 500px;
			object-fit: contain;
		}
	}
}
</style>
<style lang="less">
.login-dialog {
	width: 950px !important;
	border-radius: 10px !important;

	.el-dialog__header {
		padding: 0;
	}
	.el-dialog__body {
		padding-top: 0;
		padding-bottom: 0;
	}
	.el-dialog__headerbtn {
		font-size: 24px;
	}
}
.user-dropdown {
	.el-dropdown-menu__item {
		padding: 10px 16px;
		&:last-child {
			border-top: 1px solid #dcdfe6;
			margin-top: 10px;
		}
	}
}
</style>
