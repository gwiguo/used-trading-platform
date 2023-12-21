<template>
	<div class="bg" style="height: 100%; width: 100%">
		<canvas id="canv" width="100%" height="100%"></canvas>
	</div>
	<div class="login">
		<div class="login-container">
			<h1>后台管理系统</h1>
			<el-tabs type="border-card" stretch>
				<el-tab-pane>
					<template #label>
						<span>
							<el-icon><UserFilled /></el-icon>
							<span> 账号登录</span>
						</span>
					</template>
					<account-panel></account-panel>
				</el-tab-pane>
				<el-tab-pane>
					<template #label>
						<span>
							<el-icon><Iphone /></el-icon>
							<span> 手机登录</span>
						</span>
					</template>
					手机登录
				</el-tab-pane>
			</el-tabs>
			<div class="remember-password">
				<el-checkbox label="记住密码" name="remember" />
				<el-button type="primary" link>忘记密码</el-button>
			</div>
			<el-button class="logOn" type="primary">立即登录</el-button>
		</div>
	</div>
</template>
<script setup>
import createBg from "./bg.js";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import request from "../utils/request.js";
import { UserFilled, Iphone } from "@element-plus/icons-vue";
import accountPanel from "./account.vue";

onMounted(() => {
	createBg();
});

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

<style scoped lang="less">
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
		.el-tabs {
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		}
		.remember-password {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			height: 3em;
			background-color: #fff;
			:deep(.el-checkbox__label) {
				font-size: 16px;
			}
			.logOn {
				width: 100%;
			}
		}
	}
}
.bg {
	position: absolute;
	z-index: -1;
	height: 100%;
	background-image: -webkit-radial-gradient(ellipse farthest-corner at center center, #1b44e4 0%, #020f3a 100%);
	background-image: radial-gradient(ellipse farthest-corner at center center, #1b44e4 0%, #020f3a 100%);
	cursor: move;
	width: 100%;
	margin: 0;
	overflow: hidden;
}
// .el-form {
// 	width: 440px;
// 	background-color: #fff;
// }
</style>
