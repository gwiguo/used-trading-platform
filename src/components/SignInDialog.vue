<template>
	<el-dialog v-model="show" title="Tips" width="30%" :before-close="handleClose">
		<template #footer>
			<span class="dialog-footer">
				<!-- <el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false"> Confirm </el-button> -->
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { ElMessageBox } from "element-plus";

const props = defineProps({
	dialogVisible: Boolean
});
// console.log(props.dialogVisible);
const show = ref(false);

computed({
	get: () => props.dialogVisible,
	set: () => emit("closeDialog")
});

watch(
	() => props.dialogVisible,
	() => {
		console.log(props.dialogVisible);
	}
);

defineEmits(["closeDialog"]);

const handleClose = done => {
	show = false;
};
</script>

<style lang="less" scoped></style>
