<template>
	<div class="top-container">
		<div class="left-container">
			<el-avatar :size="150" :src="userInfo.avatar" />
			<div class="info">
				<div class="nickname">{{ userInfo.nickname }}</div>
				<el-button type="primary" plain @click="dialogVisible=true">编辑资料</el-button>
			</div>
		</div>
		<el-button type="primary" plain class="edit-address" @click="addressDialogVisible=true">编辑收货地址</el-button>
	</div>
	<div class="block"></div>
	<div class="content">
		<el-tabs v-model="activeName" @tab-click="handleClickTab">
			<el-tab-pane label="我发布的" name="published">
				<div class="item-list">
					<div class="item" v-for="item in data.published" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div></div
			></el-tab-pane>
			<el-tab-pane label="我下架的" name="removed">
				<div class="item-list">
					<div class="item" v-for="item in data.removed" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div></div
			></el-tab-pane>
			<el-tab-pane label="我收藏的" name="collected">
				<div class="item-list">
					<div class="item" v-for="item in data.collected" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="我卖出的" name="sold">
				<div class="item-list">
					<div class="item" v-for="item in data.sold" :key="item._id">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="我买到的" name="bought">
				<div class="item-list">
					<div class="item" v-for="item in data.bought" :key="item._id" @click="toOrderPage(item)">
						<el-image :src="item.goods_cover" fit="cover">
							<template #placeholder>
								<div class="image-slot">
									<el-icon size="36"><Loading /></el-icon>
								</div>
							</template>
						</el-image>
						<div class="info">
							<p class="goods-title">{{ item.goods_title }}</p>
							<div class="goods-desc">{{ item.goods_desc }}</div>
							<p class="create-time">{{ item.create_time }}</p>
							<p class="price">￥{{ item.goods_price }} {{ item.order_status }}</p>
						</div>
						<div class="btn"></div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
	<el-dialog
		v-model="dialogVisible"
		title="修改信息"
		width="500"
		center
		align-center
	>
	<el-form :model="editInfoform">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="editInfoform.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="editInfoform.password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" label-width="80px" style="align-items:center;">
		<el-upload
			class="avatar-uploader"
			action="/upload"
			:show-file-list="false"
			:on-success="uploadAvatarSuccess"
		>
			<el-avatar shape="circle" :size="150" :src="editInfoform.avatar" />
		</el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer" style="text-align: right;">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClickSaveInfo" :loading="updateUserInfoLoading">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
		v-model="addressDialogVisible"
		title="编辑地址"
		width="40%"
		align-center		
		@close="closeAddressDialog(addressFormRef)"
	>
	<el-form ref="addressFormRef" :model="addressForm" :rules="addressRules" label-width="120"> 
		<el-form-item label="收货人姓名" prop="name">
			<el-input v-model="addressForm.name" size="large" placeholder="请输入收货人姓名"></el-input>
		</el-form-item>
		<el-form-item label="手机号码" prop="mobile">
			<el-input v-model="addressForm.mobile" size="large" type="text" show-word-limit maxlength="11" placeholder="请输入手机号码"></el-input>
		</el-form-item>
		<el-form-item label="省/市" prop="city">			
			<el-cascader
				style="width: 100%"
				v-model="addressForm.city"
				:options="cityData"
				@change="handleChangeCity"
				size="large"
				placeholder="请选择"
				popper-class="city-popper"
				ref="cityCascader"
			/>
		</el-form-item>
		<el-form-item label="详细地址" prop="detail_address">
			<el-input v-model="addressForm.detail_address" size="large" placeholder="请输入详细地址"></el-input>
		</el-form-item>
	</el-form>
	<el-row>
		<el-col style="text-align: center;">
			<el-button @click="handleClickSaveAddress(addressFormRef)" :loading="saveAddressLoading">保存地址</el-button>
		</el-col>
	</el-row>
	<el-tabs>
		<el-tab-pane label="已有收货地址">
			<el-table :data="existingAddressData" v-loading="addressTableLoading">
				<el-table-column prop="name" label="收货人姓名" />
				<el-table-column prop="mobile" label="收货人手机号" />
				<el-table-column prop="address" label="收货人地址" />
			</el-table>
		</el-tab-pane>
	</el-tabs>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取消</el-button>
      </div>
    </template>
	
  </el-dialog>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, reactive } from "vue";
import { Loading } from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";
import Cookies from "js-cookie";

const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);
const { proxy } = getCurrentInstance();
const activeName = ref("bought");
console.log(userInfo);
const cityData = ref([])
const cityCascader = ref(null);
const addressFormRef = ref(null)

onMounted(async () => {
	await getMyGoods();
	getExistingAddressData();
	request("/getCity").then(res => {
		cityData.value = res.data;
	});
});

const handleChangeCity = city => {
	// addressForm.city = cityCascader.value.getCheckedNodes()[0].pathLabels[0] + cityCascader.value.getCheckedNodes()[0].pathLabels[1]
};

const existingAddressData = ref([])
const getExistingAddressData = () => {
	addressTableLoading.value = true;
	request({
		url:"/user/getAddress",
		method:"get",
		params:{
			_id:userInfo.value._id
		}
	}).then(res => {
		existingAddressData.value = res.list;
		console.log(existingAddressData.value);
	}).finally(()=>{		
		addressTableLoading.value = false;
	})
}


// const filter = data => {
// 	console.log('------');
// 	console.log(data.value);
// 	console.log('------');

// 	return data.filter(item => item.category == activeName.value)
// }

const route = useRoute();
const router = useRouter();
let pageLoading = ref();
const updateUserInfoLoading =ref(false)
const dialogVisible = ref(false)
const addressDialogVisible = ref(false)
const saveAddressLoading = ref(false)
const addressTableLoading = ref(false)
const data = reactive({
	bought: [],
	published: [],
	removed: [],
	sold: [],
	collected: []
});
const editInfoform = reactive({
	_id:userInfo.value._id,
	nickname:userInfo.value.nickname,
	password:userInfo.value.password,
	avatar:userInfo.value.avatar
})

const addressForm = reactive({
	name:"",
	mobile:"",
	city:"",
	detail_address:""
})

const addressRules = reactive({
	name:[
		{
			required:true,
			message: '请输入收货人名字',
			trigger: 'blur' 
		}
	],
	mobile:[
		{
			required:true,
			message: '请输入手机号',
			trigger: 'blur' 
		}
	],
	city:[
		{
			required:true,
			message: '请选择城市',
			trigger: 'blur' 
		}
	],
	detail_address:[
		{
			required:true,
			message: '请输入详细地址',
			trigger: 'blur' 
		}
	]
})

const getMyGoods = () => {
	pageLoading = proxy.$loading({
		target: ".main",
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
	});
	return new Promise((resolve, reject) => {
		request({
			url: "/personal/getPersonal",
			params: {
				user_id: userInfo.value._id
			}
		})
			.then(res => {
				if (res.code == 200) {
					console.log(res);
					data.bought = res.data.bought;
					data.published = res.data.published;
					data.removed = res.data.removed;
					data.sold = res.data.sold;
					data.collected = res.data.collected;
					console.log(data);
				}
			})
			.finally(() => {
				resolve();
				pageLoading.close();
			});
	});
};
const handleClickTab = (tab, event) => {
	console.log(data[tab.paneName]);
};

const toOrderPage = item => {
	// console.log(item);
	router.push(`/order/${item._id}`);
};

const handleClickSaveInfo = () => {
	console.log(editInfoform);
	updateUserInfoLoading.value = true;
	request({
		url:"/user/updateUserInfo",
		method:"post",
		data:editInfoform
	}).then(res=>{
		if(res.code == 200){
			dialogVisible.value = false;
			// 修改了密码需要重新登录
			if(userInfo.value.password != editInfoform.password){
				handleLogOut();
			}else{
				userInfo.value.nickname = editInfoform.nickname;
				userInfo.value.avatar = editInfoform.avatar;
				ElMessage({
					type: "success",
					message: "信息修改成功~",
				});				
			}
		}else{
			ElMessage({
				type: "error",
				message: "信息修改失败~",
			});	
		}
	}).finally(()=>{
		updateUserInfoLoading.value = false;
	})
}

const handleLogOut = () => {
	useStore.clear();
	const logOutLoading = proxy.$loading({
		text: "Loading...",
		spinner:
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="#409eff" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>',
	});
	setTimeout(() => logOutLoading.close(), 500);
	Cookies.remove("user_info");
	ElMessage({
		type: "warning",
		message: "密码已修改，请重新登录~",
	});
	router.push("/");
};


/**
 * @description 图片上传成功
 * @param response 上传响应结果
 * @param uploadFile 上传的文件
 * */
 const uploadAvatarSuccess = (response, uploadFile) => {
	editInfoform.avatar = response.file;
	ElNotification({ type: "success", message: "图片上传成功！" });
};

const handleClickSaveAddress = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			saveAddressLoading.value = true;
			addressForm.address = cityCascader.value.getCheckedNodes()[0].pathLabels[0] + cityCascader.value.getCheckedNodes()[0].pathLabels[1] + addressForm.detail_address;

			delete addressForm.city;
			delete addressForm.detail_address;
			request({
				url:"/user/addAddress",
				method:"post",
				data:{
					_id:userInfo.value._id,
					payload:addressForm
				}
			}).then(res=>{
				console.log(res);
				if(res.code == 200){
					ElMessage({
						type: "success",
						message: "地址保存成功~",
					});		
					getExistingAddressData();
				}else{
					ElMessage({
						type: "error",
						message: "地址保存失败~",
					});	
				}
			}).finally(()=>{
				saveAddressLoading.value = false;
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}

const closeAddressDialog = (formEl) => {
	formEl.resetFields()
}

</script>

<style lang="less" scoped>
.top-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	font-size: 20px;
	font-weight: bold;
	.left-container {
		display: flex;
		align-items: center;
		.info{
			margin-left: 20px;
			.nickname {
				margin-bottom: 20px;
			}
		}	
		.edit-address {
			margin-right: 50px;
		}
	}
}
.block {
	width: 100%;
	height: 20px;
	background-color: rgb(246, 246, 246);
}
.content {
	padding: 20px;
	.item-list {
		height: 550px;
		overflow-y: auto;		
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-thumb {
			background: #79bbff; // 滑块颜色
			border-radius: 5px; // 滑块圆角
		}
		.item {
			display: flex;
			margin-bottom: 20px;
			cursor: pointer;
			.el-image {
				flex: 0 0 auto;
				margin-right: 20px;
				width: 100px;
				height: 100px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 50%;
				overflow: hidden;
				.goods-title {
					font-weight: 600;
					margin-bottom: 10px;
					font-size: 14px;
				}
				.goods-desc {
					margin-bottom: 5px;
					color: #a8abb2;
					font-size: 14px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.create-time {
					margin-bottom: 5px;
					font-size: 14px;
				}
				.price {
					color: red;
				}
			}
		}
	}
}
.avatar-uploader{
	width:100%;
	text-align:center;
}
</style>
