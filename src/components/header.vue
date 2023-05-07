<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="handleCollapse">
            <el-icon v-if="sideBarStore.$state.isCollapse">
                <Expand/>
            </el-icon>
            <el-icon v-else>
                <Fold/>
            </el-icon>
        </div>
        <div class="header-logo">
            管理后台
        </div>

        <div class="header-right">
            <!--  用户头像   -->
<!--            <el-avatar class="user-avatar" :size="40" :src="avatarUrl"/>-->
            <!--  下拉列表   -->
            <el-dropdown class="user-name" trigger="click">
              <span class="el-dropdown-link">
                {{ userInfoStore.userInfo.userInfo.username }}
                <el-icon>
                  <arrow-down/>
                </el-icon>
              </span>
                <template #dropdown>
                    <el-dropdown-menu>
<!--                        <el-dropdown-item command="user">个人中心</el-dropdown-item>-->
                        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ArrowDown, Expand, Fold} from "@element-plus/icons-vue";
import {leftSideBarStore} from "../store/LeftSideBarStore.ts";
import {UserInfoStore} from "../store/UserInfoStore.ts";
const sideBarStore = leftSideBarStore();

let userInfoStore = UserInfoStore();
let handleCollapse = () => {
    sideBarStore.reviseCollapse();
}
let logout = function () {
    localStorage.removeItem("login_user_info");
    location.reload();
}

</script>

<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    height: 70px;
    width: 100%;
    background-color: #009381;
    font-size: 22px;
}

.collapse-btn {
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    cursor: pointer;
}

.header .header-logo {
    float: left;
    font-size: 25px;
    line-height: 70px;
    width: 250px;
}

.header-right {
    float: right;
    padding-right: 50px;
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: center;

}

.btn-bell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-avatar {
    margin-left: 20px;
}

.user-name {
    color: #ece2e2;
    margin-left: 10px;
}
</style>
