<template>
	<header id="g-header">
		<div class="bg-wrap">
			<h1>二手闲置交易平台</h1>
			<el-input v-model="searchVal" placeholder="搜闲置" class="input-search">
				<template #append>
					<el-button :icon="Search" />
				</template>
			</el-input>
			<el-button class="release-used-btn" type="primary" :icon="Plus">发布闲置</el-button>
			<el-button class="message-btn" type="primary" :icon="ChatDotSquare">消息</el-button>
			<el-button text type="primary" class="login-btn" v-if="true" @click="dialogVisible = true">登录</el-button>
			<div class="user-wrap" v-else>
				<p class="user-name">测试账号</p>
				<el-avatar :size="50" src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64" />
			</div>
		</div>
	</header>
	<el-dialog v-model="dialogVisible" width="500px" :before-close="handleClose" align-center>
		<div class="login">
			<div class="login-container">
				<el-form label-width="60px" :rules="rules" :model="account">
					<el-form-item label="账号" prop="name">
						<el-input v-model="account.name"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="account.password" show-password></el-input>
					</el-form-item>
				</el-form>
				<!-- <div class="remember-password">
					<el-checkbox label="记住密码" name="remember" />
					<el-button type="primary" link>忘记密码</el-button>
				</div> -->
				<div class="btn-list">
					<el-button class="sign-in" type="primary" size="large">登录</el-button>
					<el-button class="sign-up" size="large">注册</el-button>
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { Search, Plus, ChatDotSquare, UserFilled, Iphone } from "@element-plus/icons-vue";
// import SignInDialog from "./SignInDialog.vue";

const account = reactive({
	name: "",
	password: ""
});

const rules = {
	name: [
		{
			required: true,
			message: "请输入账号",
			trigger: "blur"
		},
		{
			pattern: /^[a-z0-9]{5,10}$/,
			message: "用户名必须是5-10个字母或者数字",
			trigger: "blur"
		}
	],
	password: [
		{
			required: true,
			message: "请输入密码",
			trigger: "blur"
		},
		{
			pattern: /^[a-z0-9]{3,}$/,
			message: "密码必须是3位以上的字母或者数字",
			trigger: "blur"
		}
	]
};
const searchVal = ref("");

const dialogVisible = ref(false);
const handleClose = done => {
	dialogVisible.value = false;
};

const closeSignInDialog = () => {
	SignInDialogVisible.value = false;
};

const handleClickSignInBtn = () => {
	SignInDialogVisible.value = true;
	console.log(SignInDialogVisible.value);
};

const handleClick = () => {
	ElMessage({
		type: "success",
		message: "test"
	});
	ElNotification({
		message: "ElNotification "
	});
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
		width: 1400px;
	}
	h1 {
		flex: 0 0 auto;
		margin: 0;
		color: #409eff;
		font-size: 36px;
	}
	.input-search {
		margin-left: 65px;
		width: 450px;
		height: 42px;
	}
	.release-used-btn {
		margin-left: 65px;
		height: 42px;
	}
	.message-btn {
		margin-left: 65px;
		height: 42px;
	}
	.login-btn {
		margin-left: auto;
		font-weight: 600;
	}
	.user-wrap {
		display: flex;
		margin-left: 65px;
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
		width: 400px;
		h1 {
			text-align: center;
			color: #fff;
		}
		.el-form {
			margin-bottom: 30px;
		}
		.remember-password {
			text-align: right;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
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
			}
			.sign-in {
				// width: 100%;
			}
			.sign-up {
				margin-left: 20px;
			}
		}
	}
}
</style>
