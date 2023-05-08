<template>
    <V-Header/>
    <div style="height: calc(100% - 70px);display: flex">
        <LeftSideBar/>
        <div class="context-box">
            <router-view>

            </router-view>
        </div>
    </div>
</template>


<script setup lang="ts">
import VHeader from "../components/header.vue"
import LeftSideBar from "../components/LeftSideBar.vue";
import router from "../router";
import {UserInfoStore} from "../store/UserInfoStore.ts";

let userInfoStore = UserInfoStore();
type UserInfo = {
    "userInfo": {
        "id": string,
        "username": string,
        "phone": string
    },
    "token": string,
    "roleList": string[]
}

let userInfo: UserInfo;

if (localStorage.getItem("login_user_info") == null) {
    router.push("/login")
} else {
    userInfo = <UserInfo>JSON.parse(localStorage.getItem("login_user_info"));
    userInfoStore.$state.userInfo = userInfo;
}
</script>

<style>
.context-box {
    display: flex;
    overflow: auto;
    height: calc(100vh - 70px);
    margin-left: auto;
    margin-right: auto;
}
</style>
