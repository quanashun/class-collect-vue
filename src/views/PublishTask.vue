<template>
    <div id="task-form">
        <el-form
                ref="formRef"
                :model="taskForm"
                label-width="120px"
                class="demo-dynamic"
        >
            <el-form-item
                    prop="taskName"
                    label="任务名称"
                    :rules="[
        {
          required: true,
          message: '请输入任务名称',
          trigger: 'blur',
        }
      ]"
            >
                <el-input v-model="taskForm.taskName" placeholder="比如（程序设计课学生课表收集）"
                          oninput="value=value.trim()"
                />
            </el-form-item>

            <el-form-item
                prop="remark"
                label="备注"
            >
                <el-input v-model="taskForm.remark"
                          type="textarea"
                          :autosize="{ minRows: 3, maxRows: 10 }"
                          placeholder="备注在填写页面可见，可用来告诉填写者当有课还是没课的时候选择单元格"
                          oninput="value=value.trim()"
                />
            </el-form-item>

            <el-form-item
                    v-for="(domain, index) in taskForm.tableNames"
                    :key="domain.tableIndex"
                    :label="'表' + (index+1)"
                    :prop="'tableNames['+index+'].tableName'"
                    :rules="{
        required: true,
        message: '表名不能为空',
        trigger: 'blur',
      }"
            >
                <el-input v-model="domain.tableName" placeholder="比如（第13周课表）"
                          oninput="value=value.trim()"
                />
                <el-button class="mt-2" @click.prevent="removeDomain(domain)">删除
                </el-button
                >
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
                <el-button @click="addDomain">添加表</el-button>
                <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessage} from "element-plus";
import service from "../utils/request.ts";

const formRef = ref<FormInstance>()
const taskForm = reactive<{
    tableNames: TableItem[]
    taskName: string
    remark: string
}>({
    taskName: '',
    remark: '',
    tableNames: [
        {
            tableIndex: 1,
            tableName: '',
        },
    ],

})

interface TableItem {
    tableIndex: number
    tableName: string
}

const removeDomain = (item: TableItem) => {
    const index = taskForm.tableNames.indexOf(item)
    if (index !== -1) {
        taskForm.tableNames.splice(index, 1)
    }
}

const addDomain = () => {
    taskForm.tableNames.push({
        tableIndex: Date.now(),
        tableName: '',
    })
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            service.post("/schedule-collect-result/addTask", {
                "taskName": taskForm.taskName,
                "remark": taskForm.remark,
                "tableNames": taskForm.tableNames.map(item => item.tableName)
            }).then(
                response => {
                    if (response.data.code == 0) {
                        ElMessage.success("提交成功")
                        location.reload()
                    } else {
                        ElMessage.error("系统错误")
                    }
                }
            ).catch(
                () => {
                    ElMessage.error("请求发送失败，请重试")
                }
            )
        } else {
            ElMessage.error("提交失败")
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped>
#task-form {
    margin-top: 2rem;
}

</style>
