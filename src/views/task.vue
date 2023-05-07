<template>
    <div id="header">
        <el-avatar @click="onclickHeader" class="avatar" :size="50"> {{ userInfo.userName }}</el-avatar>
    </div>
    <el-dialog
            v-model="dialogVisible"
            title="登录"
            width="30%"
            :close-on-click-modal=false
            :close-on-press-escape=false
            :show-close=false
            :draggable="true"
    >

        <el-form
                label-width="100px"
        >
            <el-form-item
                    label="唯一ID"
                    required
            >
                <el-input
                        type="text"
                        placeholder="手机号或者学号(6-11位)"
                        clearable
                        oninput="value=value.replace(/[^\d.]/g,'')"
                        minlength="6"
                        maxlength="11"
                        v-model="inputUserId"
                ></el-input>
            </el-form-item>
            <el-form-item
                    label="名字"
                    required
            >
                <el-input
                        minlength="2"
                        maxlength="10"
                        v-model="inputUserName"
                        clearable
                ></el-input>
            </el-form-item>
        </el-form>


        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="storeUserInfo">
              保存
            </el-button>
          </span>
        </template>
    </el-dialog>


    <div class="schedule-box">
        <div><h1>{{ classList.taskName }}</h1><h6 v-if="classList.taskId != null">(点击单元格以选中)</h6></div>
        <div style="max-width: 55vw"><h4 v-if="classList.taskId != null">备注：{{classList.remark}}</h4></div>
        <div v-for="item in classList.tableList" :key="item.tableId">
            <h2>{{ item.tableName }}</h2>
            <el-table
                    :data="item.dataList"
                    border
                    style="width: 100%"
                    class="courseForm"
                    :header-cell-style="{ background: '#5D87EB', color: '#fff'}"
                    @cell-click="handleClickCell"
                    :cell-style="cellStyle"
            >
                <el-table-column prop="date" label="日期/节次" width="100" align="center"></el-table-column>
                <el-table-column prop="one" label=1 width="110" align="center">
                    <template></template>
                </el-table-column>
                <el-table-column prop="two" label="2" width="110" align="center">
                    <template></template>
                </el-table-column>
                <el-table-column prop="three" label="3" width="110" align="center">
                    <template></template>
                </el-table-column>
                <el-table-column prop="four" label="4" width="110" align="center">
                    <template></template>
                </el-table-column>
                <el-table-column prop="five" label="5" width="110" align="center">
                    <template></template>
                </el-table-column>
            </el-table>
        </div>
        <div class="empty-box">
            <h2>占位</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import axiosService from "../utils/request.ts";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const route = useRoute()

// 通过 computed 函数来获取当前的路由参数
const taskId = computed(() => route.params.taskId)
//默认不显示登录框
let dialogVisible = ref(false);
let inputUserId = ref("");
let inputUserName = ref("");

//定义user信息，保存在local stage中
type UserInfo = {
    userId: string,
    userName: string
}
let userInfo: UserInfo = reactive({userId: "", userName: ""});
let classList = reactive({
    "taskId": 111,
    "taskName": "展示课表",
    "remark": "",
    "tableList": [{
        "tableId": 1,
        "tableName": "13周课表",
        "dataList": [{
            "taskId": 111,
            "tableId": 1,
            "date": "周一",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周二",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周三",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周四",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周五",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周六",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }, {
            "taskId": 111,
            "tableId": 1,
            "date": "周日",
            "one": "0",
            "two": "0",
            "three": "0",
            "four": "0",
            "five": "0"
        }]
    }]
});
let getTaskTableData = function () {
    axiosService.get("/schedule-collect-result/getTaskTables", {
        params: {
            userId: userInfo.userId,
            taskId: taskId.value
        }
    }).then(
        (response) => {
            if (response.data.code == 500) {
                ElMessage.error("获取任务失败，请检查参数或稍后重试")
                return;
            }
            if (response.status == 200) {
                classList.taskId = response.data.taskId;
                classList.taskName = response.data.taskName;
                classList.remark = response.data.remark;
                classList.tableList = response.data.tableList;
                return;
            }
        }
    ).catch(
        () => {
            ElMessage.error("网络请求发送失败，稍后刷新试试");
            return;
        }
    )
}

if (JSON.parse(localStorage.getItem("userInfo")) == null) {
    dialogVisible.value = true;
} else {
    userInfo = <UserInfo>JSON.parse(localStorage.getItem("userInfo"));
    getTaskTableData();
    inputUserId.value = userInfo.userId;
    inputUserName.value = userInfo.userName;
}

let handleClickCell = function (row, column) {
    for (const table of classList.tableList) {
        if (table.tableId === row["tableId"]) {
            for (const data of table.dataList) {
                if (data.date === row["date"]) {
                    if (data[column.property] == "1") {
                        data[column.property] = "0";
                        axiosService.post("/schedule-collect-result/setTaskTableData", {
                            "taskId": taskId.value,
                            "tableId": row["tableId"],
                            "date": row["date"],
                            "userId": userInfo.userId,
                            "userName": userInfo.userName,
                            "one": row["one"],
                            "two": row["two"],
                            "three": row["three"],
                            "four": row["four"],
                            "five": row["five"],
                        }).catch(
                            () => {
                                ElMessage.error('请求发送失败，稍后重试')
                                data[column.property] = "1";
                            }
                        );
                    } else if (data[column.property] == "0") {
                        data[column.property] = "1";
                        axiosService.post("/schedule-collect-result/setTaskTableData", {
                            "taskId": taskId.value,
                            "tableId": row["tableId"],
                            "date": row["date"],
                            "userId": userInfo.userId,
                            "userName": userInfo.userName,
                            "one": row["one"],
                            "two": row["two"],
                            "three": row["three"],
                            "four": row["four"],
                            "five": row["five"],
                        }).catch(
                            () => {
                                ElMessage.error('请求发送失败，稍后重试')
                                data[column.property] = "0";
                            }
                        );
                    }
                    break; // 找到后直接结束循环
                }
            }
            break; // 找到后直接结束循环
        }
    }
}
let cellStyle = function ({row, column}) {
    if (column.property === "date") {
        return "";
    }
    if (row[column.property] == 1) {
        return {
            backgroundColor: 'pink'
        }
    }
}

let storeUserInfo = function () {

    if (inputUserId.value == "") {
        ElMessage.error("ID不能为空");
        return;
    }
    if (inputUserId.value.length < 6) {
        ElMessage.error("ID小于六位");
        return;
    }
    if (inputUserName.value == "") {
        ElMessage.error("名字不能为空");
        return;
    }
    if (inputUserName.value.length < 2) {
        ElMessage.error("名字小于两位");
        return;
    }
    userInfo.userId = inputUserId.value;
    userInfo.userName = inputUserName.value;
    dialogVisible.value = false;
    getTaskTableData()
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

let onclickHeader = function () {
    dialogVisible.value = true;
}
</script>

<style scoped>
body {
    padding: 20px;
}

.schedule-box {
    overflow: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#header {
    position: absolute;
    right: 2rem;
    top: 2rem;
}

.avatar {
    background-color: #66b7af;
}

.empty-box {
    color: transparent;
}
</style>
