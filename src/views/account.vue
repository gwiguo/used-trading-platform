<template>
	<el-form label-width="60px" :rules="rules" :model="account">
		<el-form-item label="账号" prop="name">
			<el-input v-model="account.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="account.password"></el-input>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";

const account = reactive({
	name: "",
	password: ""
});

const rules = {
	name: [
		{
			required: true,
			message: "请输入用户名",
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
</script>

<style lang="less" scoped></style>
