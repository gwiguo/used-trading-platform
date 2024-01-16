<template>
	<div class="publish-container">
		<h1>发布闲置</h1>
		<div class="content-container">
			<el-form :model="payload" label-width="120px" :rules="rules" ref="ruleFormRef">
				<el-form-item label="闲置名称：" prop="title">
					<el-input
						v-model="payload.title"
						maxlength="30"
						size="large"
						placeholder="请输入闲置名称..."
						show-word-limit
						type="text"
					/>
				</el-form-item>
				<el-form-item label="闲置介绍：" prop="desc">
					<el-input
						v-model="payload.desc"
						maxlength="1000"
						:rows="5"
						size="large"
						placeholder="请输入闲置的详细介绍..."
						show-word-limit
						type="textarea"
					/>
				</el-form-item>
				<el-form-item label="您的地区：" prop="cityVal">
					<el-cascader
						style="width: 100%"
						v-model="cityVal"
						:options="cityData"
						@change="handleChangeCity"
						size="large"
						placeholder="请选择您的地区..."
						popper-class="city-popper"
						ref="cityCascader"
					/>
				</el-form-item>
				<el-form-item label="闲置类别：" prop="type">
					<el-select style="width: 100%" v-model="payload.type" placeholder="请选择闲置类型..." size="large">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="价格：" prop="price">
					<el-input
						v-model="payload.price"
						size="large"
						placeholder="请输入价格..."
						show-word-limit
						type="text"
					/>
				</el-form-item>
				<el-form-item label="闲置图片：" prop="images">
					<el-upload
						action="/upload"
						v-model:file-list="payload.images"
						:limit="7"
						accept="image/*"
						list-type="picture-card"
						:before-upload="beforeUpload"
						:on-success="uploadSuccess"
						:on-exceed="handleExceed"
						:on-error="uploadError"
					>
						<template #file="{ file }">
							<img :src="file.url" class="upload-image" />
							<div class="upload-handle" @click.stop>
								<div class="handle-icon" @click="handlePictureCardPreview(file)">
									<el-icon><ZoomIn /></el-icon>
									<span>查看</span>
								</div>
								<div class="handle-icon" @click="handleRemove(file)">
									<el-icon><Delete /></el-icon>
									<span>删除</span>
								</div>
							</div>
						</template>
						<div
							style="
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								color: #909399;
							"
						>
							<el-icon size="28"><Picture /></el-icon>
							请上传图片
						</div>
					</el-upload>
					<el-image-viewer v-if="imgViewVisible" :url-list="[viewImageUrl]" @close="imgViewVisible = false" />
				</el-form-item>
			</el-form>
			<el-row style="justify-content: center; margin-top: 50px">
				<el-button type="primary" plain size="large" @click="handleClickPublish(ruleFormRef)"
					>发布闲置</el-button
				>
			</el-row>
		</div>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import request from "@/utils/request.js";
import { Picture, ZoomIn, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElNotification } from "element-plus";
import Cookies from "js-cookie";
import { formaDate } from "@/utils/utils.js";
import { useRouter } from "vue-router";
import { useMain } from "@/store/index.js";

const useStore = useMain();

const router = useRouter();

const payload = reactive({
	title: "",
	desc: "",
	type: "",
	location: "",
	price: "",
	images: []
});
const ruleFormRef = ref(null);
const cityCascader = ref(null);
const cityData = ref([]);
const cityVal = ref("");
const typeList = ref([
	{ label: "数码", value: "数码" },
	{ label: "家电", value: "家电" },
	{ label: "户外", value: "户外" },
	{ label: "图书", value: "图书" },
	{ label: "其它", value: "其它" }
]);
const rules = reactive({
	title: [{ required: true, message: "请输入闲置名称", trigger: "blur" }],
	desc: [{ required: true, message: "请输入闲置简介", trigger: "blur" }],
	type: [{ required: true, message: "请选择闲置类型", trigger: "blur" }],
	location: [{ required: true, message: "请选择地区", trigger: "blur" }],
	price: [{ required: true, message: "请输入闲置价格", trigger: "blur" }],
	images: [{ required: true, message: "请上传闲置图片", trigger: "blur" }]
});

onMounted(() => {
	request("/getCity").then(res => {
		cityData.value = res.data;
	});
});

const handleChangeCity = city => {
	payload.location = cityCascader.value.getCheckedNodes()[0].pathLabels[1];
};
/**
 * @description 图片预览
 * @param file 预览的文件
 * */
const viewImageUrl = ref("");
const imgViewVisible = ref(false);
const handlePictureCardPreview = file => {
	viewImageUrl.value = file.url;
	imgViewVisible.value = true;
};
/**
 * @description 删除图片
 * @param file 删除的文件
 * */
const handleRemove = file => {
	payload.images = payload.images.filter(item => item.url !== file.url || item.name !== file.name);
};

// const userInfo = JSON.parse();
const handleClickPublish = ruleFormRef => {
	ruleFormRef.validate(valid => {
		if (valid) {
			const postPayload = JSON.parse(JSON.stringify(payload));
			postPayload.images = payload.images.map(item => item.url);
			postPayload.publish_time = formaDate(new Date());
			postPayload.user_avatar = useStore.userInfo.avatar;
			postPayload.publish_user = useStore.userInfo.nickname;
			request({
				url: "/goods/publishGoods",
				method: "POST",
				data: postPayload
			}).then(res => {
				if (res.code == 200) {
					router.push(`/item/${res.data.insertedId}`);
					ElNotification({ type: "success", message: "闲置发布成功！" });
				} else {
					ElNotification({ type: "error", message: "闲置发布失败~请查看接口日志" });
				}
			});
		}
	});
};

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload = rawFile => {
	const imgSize = rawFile.size / 1024 / 1024 < 3;
	const imgType = /^image\//.test(rawFile.type);
	if (!imgType) {
		ElNotification({ type: "error", message: "只能上传图片！" });
	}
	if (!imgSize) {
		ElNotification({ type: "error", message: "上传图片大小不能超过3M！" });
	}
	return imgType && imgSize;
};

/**
 * @description 图片上传成功
 * @param response 上传响应结果
 * @param uploadFile 上传的文件
 * */
const uploadSuccess = (response, uploadFile) => {
	uploadFile.url = response.file;
	ElNotification({ type: "success", message: "图片上传成功！" });
};
/**
 * @description 图片上传错误
 * */
const uploadError = () => {
	ElNotification({
		message: "图片上传失败，请您重新上传！",
		type: "error"
	});
};
/**
 * @description 图片数量超出
 * */
const handleExceed = () => {
	ElNotification({
		message: "最多只能上传7张图片，请移除后上传！",
		type: "error"
	});
};
</script>

<style lang="less" scoped>
.publish-container {
	padding-top: 20px;
	padding-bottom: 40px;
	width: 100%;
	height: 100%;
	h1 {
		margin-bottom: 30px;
		text-align: center;
	}
	:deep(.content-container) {
		margin: 0 auto;
		width: 800px;
		.el-form-item__label {
			height: 40px;
			line-height: 40px;
		}
		.el-row {
			margin-top: 20px;
		}
		:deep(.el-cascader) {
			width: 100%;
		}
		.upload-image {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		.upload-handle {
			position: absolute;
			top: 0;
			right: 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: pointer;
			background: rgb(0 0 0 / 60%);
			opacity: 0;
			transition: var(--el-transition-duration-fast);
			.handle-icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0 6%;
				color: aliceblue;
				.el-icon {
					margin-bottom: 15%;
					font-size: 140%;
				}
				span {
					font-size: 100%;
				}
			}
		}
		.el-upload-list__item {
			&:hover {
				.upload-handle {
					opacity: 1;
				}
			}
		}
	}
}
</style>
<style lang="less">
.city-popper {
	// height: 500px;
	// overflow: hidden;
	.el-cascader-menu__wrap {
		height: 520px;
	}
}
</style>
