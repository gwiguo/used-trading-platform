import { defineStore } from "pinia" // 定义容器

export const useMain = defineStore('useMain', {
    persist: true,
    state: () => {
        return {
            search: "",
            currentType: "全部",
            dataList: [],
            userInfo: {},
            // 个人中心中我发布了XX我收藏了XX的数据
            personal: {}
        }
    },
    /**
     * 用来封装计算属性 有缓存功能  类似于computed
     */
    getters: {

    },
    /**
     * 编辑业务逻辑  类似于methods
     */
    actions: {
        updateSearch(search) {
            this.search = search
        },
        updateType(type) {
            this.currentType = type
        },
        updateDataList(dataList) {
            this.dataList = dataList
        },
        updateUserInfo(userInfo) {
            this.userInfo = userInfo
        },
        updatePersonal(personal) {
            this.personal = personal
        },
        clear() {
            this.userInfo = {}
            this.personal = {}
        }
    }

})