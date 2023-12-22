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
			<div class="user-wrap">
				<p class="user-name">测试账号</p>
				<el-avatar :size="50" src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64" />
			</div>
		</div>
	</header>
</template>

<script setup>
import { ref } from "vue";
import { Search, Plus, ChatDotSquare } from "@element-plus/icons-vue";

const searchVal = ref("");
</script>

<style lang="less" scoped>
#g-header {
	background-color: #fff;
	.bg-wrap {
		display: flex;
		align-items: center;
		padding: 20px 0;
		margin: 0 auto;
		width: 1400px;
	}
	h1 {
		flex: 0 0 auto;
		margin: 0;
		color: #409eff;
		font-size: 42px;
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
	.user-wrap {
		display: flex;
		margin-left: 65px;
		.user-name {
			width: 100px;
			text-align: right;
			color: #409eff;
		}
		.el-avatar {
			margin-left: 10px;
		}
	}
}
</style>
