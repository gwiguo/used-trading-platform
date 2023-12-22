<template>
	<Global-header></Global-header>
	<div class="main">
		<router-view></router-view>
	</div>
</template>

<script setup>
import GlobalHeader from "./components/GlobalHeader.vue";
</script>

<style lang="less" scoped>
.main {
	margin: 0 auto;
	width: 1400px;
}
</style>
