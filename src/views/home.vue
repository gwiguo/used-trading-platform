<template>
    <div class="wrap">
        <div class="tab-list">
            <div class="tab-item" v-for="(tab, index) in tabList" :key="tab" :class="{ cur: tabVal == tab }"
                @click="changeTab(tab)" :style="index === 0 && tabVal == tab ? 'border-left-color:transparent;' : ''">
                {{ tab }}</div>
        </div>
        <div class="content">
            <div class="item">
                <el-image style="width: 312.5px; height: 312.5px"
                    src="https://www.apple.com.cn/v/iphone/home/br/images/overview/compare/compare_iphone_15_pro__c344odaqs5qq_large.png"
                    fit="cover" />
                <p class="title">二手苹果手机</p>
                <div class="info">
                    <span class="price">￥5500</span>
                    <span class="location">广州市</span>
                </div>
                <p class="time"></p>
                <div class="user-wrap">
                    <el-avatar shape="square" :size="50"
                        src="https://avatars.githubusercontent.com/u/23100055?v=4&size=64" />
                    <span class="user-name">我是谁</span>
                </div>
            </div>
            <div class="item">
                <el-image style="width: 312.5px; height: 312.5px"
                    src="https://www.apple.com.cn/v/iphone/home/br/images/overview/compare/compare_iphone_15_pro__c344odaqs5qq_large.png"
                    fit="cover" />
            </div>
            <div class="item">
                <el-image style="width: 312.5px; height: 312.5px"
                    src="https://www.apple.com.cn/v/iphone/home/br/images/overview/compare/compare_iphone_15_pro__c344odaqs5qq_large.png"
                    fit="cover" />
            </div>
            <div class="item">
                <el-image style="width: 312.5px; height: 312.5px"
                    src="https://www.apple.com.cn/v/iphone/home/br/images/overview/compare/compare_iphone_15_pro__c344odaqs5qq_large.png"
                    fit="cover" />
            </div>
            <div class="item">
                <el-image style="width: 312.5px; height: 312.5px"
                    src="https://www.apple.com.cn/v/iphone/home/br/images/overview/compare/compare_iphone_15_pro__c344odaqs5qq_large.png"
                    fit="cover" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const tabList = ["全部", "数码", "家电", "户外", "图书", "其它"];

const tabVal = ref("全部");

const changeTab = (tab) => {
    tabVal.value = tab;
}

</script>

<style lang="less" scoped>
.wrap {
    margin-top: 20px;

    :deep(.el-tabs__header) {
        user-select: none;
    }

    border: 1px solid #dcdfe6;

    .tab-list {
        display: flex;
        height: 39px;
        box-sizing: border-box;

        .tab-item {
            // margin-top: -1px;
            // margin-left: -1px;
            padding: 0 20px;
            // padding-right: 1px;
            // width: 74px;
            height: 38px;
            line-height: 38px;
            cursor: pointer;
            color: #909399;
            box-sizing: border-box;
            border: 1px solid transparent;
            user-select: none;
        }

        .cur {
            background-color: #fff;
            color: #409eff;
            border-left-color: #dcdfe6;
            border-right-color: #dcdfe6;
        }
    }

    .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 30px;
        background-color: #fff;

        .item:nth-child(n+5) {
            margin-top: 30px;
        }
    }
}
</style>
