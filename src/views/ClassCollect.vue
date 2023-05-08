<template>
    <div id="my-collect-list">
        <div id="my-collect-list-table">
            <el-table
                    :data="tableData"
                    stripe
                    @row-dblclick="pushTo"
                    @cell-mouse-enter="setCurrentRow"
                    :cell-style="{padding: '0'}"
                    cell-class-name="cell-class"
                    :row-style="{height: '0'}"
            >
                <el-table-column prop="title" label="标题(双击查看)" width="180" align="center"/>
                <el-table-column prop="numberOfFilled" label="填写人数" width="180" align="center"/>
                <el-table-column prop="remark" label="备注" width="180" align="center"/>
                <el-table-column align="center" label="填写链接">
                    <el-button type="primary" :icon="Share" circle @click="shareLink"/>
                </el-table-column>
                <el-table-column align="center">
                    <el-button type="danger" :icon="Delete" circle @click="deleteTask()"/>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {Delete, Share} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import service from "../utils/request.ts";
import {reactive} from "vue";
import router from "../router";

let currentRow = reactive<{
    "taskId": string,
    "title": string,
    "numberOfFilled": number,
    "remark": string,
    "address": string
}>({
    "taskId": "",
    "title": "",
    "numberOfFilled": 0,
    "remark": "",
    "address": ""
});
let tableData = reactive<any[]>([]);

service.get("/schedule-collect-result/getOwnScheduleCollectTaskList").then(
    (response) => {
        if (response.data.code == 0) {
            response.data.data.forEach((item) => {
                tableData.push(item)
            })
        }
    }
).catch(() => {
    ElMessage.error("获取数据失败，请登录")
})
let deleteTask = function () {
    ElMessageBox.confirm(
        '确定要删除该任务吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true
        }
    )
        .then(() => {
            service.get("/schedule-collect-result/deleteTask", {
                params: {
                    "taskId": currentRow.taskId,
                }
            }).then((response) => {
                if (response.data.code == 0) {
                    ElMessage({
                        showClose: true,
                        message: "删除任务成功",
                        type: 'success',
                    })
                    location.reload()

                } else {
                    ElMessage({
                        showClose: true,
                        message: "系统错误，稍后重试",
                        type: 'error',
                    })
                }

            }).catch(() => {
                ElMessage({
                    showClose: true,
                    message: "请求发送失败，稍后重试",
                    type: 'error',
                })
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })

}

let pushTo = function (row) {
    router.push("/console/task-result/" + row["taskId"])
}

let setCurrentRow = function (row) {
    currentRow.taskId = row["taskId"];
    currentRow.title = row["title"];
    currentRow.numberOfFilled = row["numberOfFilled"];
    currentRow.remark = row["remark"];
    currentRow.address = row["address"];
}

let shareLink = function () {
    ElMessageBox.alert(currentRow.address, '复制以下链接分享给别人填写', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
    })
}
</script>

<style>

.cell-class > div {
    max-height: 100px;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

</style>
