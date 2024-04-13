<template>
	<Global-header></Global-header>
	<div class="main">
        <router-view></router-view>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.main {
	overflow: hidden;
	margin: 0 auto;
	margin-top: 20px;
	width: 1215px;
	// height: 977px;
	height: calc(100vh - 110px);
	background-color: #fff;
}
</style>