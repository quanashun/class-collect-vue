<template>
    <div class="left-side-bar">
        <el-menu
            class="side-menu"
            router
            unique-opened
            :default-active="currentRoute"
            :collapse="sideBarStore.$state.isCollapse"
            background-color="#66b7af"
            text-color="black"
            active-text-color="#f1a74e"
        >
            <el-menu-item index="/console/class-collect">
                <el-icon><HomeFilled /></el-icon>
                <span>任务列表</span>
            </el-menu-item>
            <el-menu-item index="/console/publish-task">
                <el-icon><HomeFilled /></el-icon>
                <span>发布任务</span>
            </el-menu-item>
            <el-menu-item index="/console/item2">
                <el-icon><Comment /></el-icon>
                <span>待续</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import {leftSideBarStore} from "../store/LeftSideBarStore.ts";
import {Comment, HomeFilled} from "@element-plus/icons-vue";

const sideBarStore = leftSideBarStore();

const currentRoute = computed(()=>{
    return useRoute().path;
})
</script>

<style scoped>
.left-side-bar {
    background-color: #66b7af;
    overflow-y: auto;
    display: flex;
    height: 100%;
    margin-left: 0;
}
.el-menu{
    max-width: 250px;
}
</style>
