<template>
    <div>
        <el-drawer
            v-model="drawer"
            title="填写此单元格的名单"
            direction="rtl"

        >
            <span>{{cellFulledNames.toString()}}</span>
        </el-drawer>
    </div>
    <div class="schedule-box">
        <div><h1>{{ classList.taskName }}</h1><h6>(点击单元格查看具体情况)</h6></div>
        <div style="max-width: 55vw"><h4>备注：{{classList.remark}}</h4></div>
        <div v-for="item in classList.tableList" :key="item.tableId">
            <h2>{{ item.tableName }}</h2>
            <el-table
                    :data="item.dataList"
                    border
                    style="width: 100%"
                    class="courseForm"
                    :header-cell-style="{ background: '#5D87EB', color: '#fff'}"
                    :cell-style="cellStyle"
                    @cell-click="statisticsOneCellFulledNames"
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
import {useRoute} from "vue-router";
import {computed, reactive, ref} from "vue";
import axiosService from "../utils/request.ts";
import {ElMessage} from "element-plus";
import service from "../utils/request.ts";

const route = useRoute()
let drawer = ref(false);
// 通过 computed 函数来获取当前的路由参数
const taskId = computed(() => route.params.taskId)
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
    axiosService.get("/schedule-collect-result/getTaskResult", {
        params: {
            taskId: taskId.value
        }
    }).then(
        (response) => {
            if (response.data.code == 500) {
                ElMessage.error("获取数据失败，请检查参数或稍后重试")
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
getTaskTableData();
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
let cellFulledNames = reactive<string[]>([]);
let statisticsOneCellFulledNames = function (row, column) {
    service.post("/schedule-collect-result/statisticsOneCellFulledNames",{
        "taskId": taskId.value,
        "tableId": row["tableId"],
        "date": row["date"],
        "number": column.property
    }).then(
        (response)=>{
            for (let i = 0; i <= cellFulledNames.length; i++) {
                cellFulledNames.pop()
            }
            response.data.forEach(
                item=>{
                    cellFulledNames.push(item)
                }
            )
            drawer.value=true
        }
    ).catch(
        (error)=>{
            ElMessage.error("获取名单失败");
            cellFulledNames = reactive<string[]>([]);
        }
    )
}
</script>

<style scoped>
.schedule-box {
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}


.empty-box {
    color: transparent;
}
</style>
