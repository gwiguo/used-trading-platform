<template>
    <div class="message-page" v-loading="pageLoading">
        <h3>我的消息</h3>
        <el-divider />
        <div class="msg-list">
            <div class="msg-item" v-for="item in messageList" :key="item._id" @click="$router.push(`item/${item.goods_id}`)">
                <div class="main">
                    <div class="content">
                        <div class="avatar">
                            <el-avatar shape="square" :size="55" :src="item.avatar" />
                        </div>
                        <div class="info">
                            <p class="nickname">{{item.nickname}}</p>
                            <p class="msg">{{item.content}}</p>
                            <p class="time">{{ item.time }}</p>
                        </div>
                    </div>
                    <el-image style="width:130px;height:90px;" :src="item.goods_cover" fit="cover">
                        <template #placeholder>
                            <div class="image-slot">
                                <el-icon size="36"><Loading /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </div> 
                <el-divider />
            </div>

            
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive } from "vue";
import request from "@/utils/request.js";
import { storeToRefs } from "pinia";
import { useMain } from "@/store/index.js";

const useStore = useMain();
const { userInfo, personal } = storeToRefs(useStore);

onMounted(async () => {
	await getMessageList();
});

const pageLoading = ref(false)
const messageList = ref([])
const getMessageList = () => {
    pageLoading.value = true;
	request({
		url:"/personal/getMyMessage",
		method:"get",
		params:{
			_id:userInfo.value._id
		}
	}).then(res => {
        console.log(res);
		messageList.value = res.data;
	}).finally(()=>{		
		pageLoading.value = false;
	})
}

</script>

<style lang="less" scoped>
.message-page{
    padding:20px;
    h3{
        margin:0;
    }
    .msg-list{
        .msg-item{
            cursor:pointer;
            .main{
                display:flex;
                justify-content:space-between;
                .content{
                    display:flex;
                    .info{
                        margin-left:10px;
                        .nickname{
                            font-weight: 600;
                            font-size: 18px;
                            padding-bottom: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .msg{
                            font-size: 16px;
                            padding-bottom: 15px;
                            color: #555;
                            width: 710px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .time{
                            font-size: 13px;
                            color: #555;
                        }
                    }
                }
            }

        }
    }
}

</style>