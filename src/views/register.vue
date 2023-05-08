<template>
    <div id="register-container">
        <div>
            <h1>后台管理</h1>
        </div>
        <div id="register-form">
            <el-input v-model="registerForm.userId"
                      type="text"
                      placeholder="用户ID，手机号或者学号(6-11位)"
                      clearable
                      oninput="value=value.replace(/[^\d.]/g,'')"
                      minlength="6"
                      maxlength="11"
                      style="margin-top: 2rem">
            </el-input>
            <el-input v-model="registerForm.userName"
                      type="text"
                      placeholder="用户名"
                      clearable
                      minlength="2"
                      maxlength="11"
            >
            </el-input>
            <el-input
                    v-model="registerForm.password"
                    type="password"
                    placeholder="密码"
                    show-password
            />
            <el-input
                    v-model="repeatPassword"
                    type="password"
                    placeholder="重复密码"
                    show-password
            />
            <div>
                <el-button round @click="register">注册</el-button>
            </div>
            <el-divider/>
            <h6>已有账号，
                <router-link to="/login">去登录？</router-link>
            </h6>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "../router";
import service from "../utils/request.ts";

let registerForm = reactive({"userId": "", "password": "", "userName": ""});
let repeatPassword = ref("");

let register = function () {
    if (registerForm.userId.length < 6) {
        ElMessage.error("ID小于六位");
        return;
    }
    if (registerForm.userName.length < 2) {
        ElMessage.error("用户名小于两位");
        return;
    }
    if (registerForm.password.length < 5) {
        ElMessage.error("密码太短");
        return;
    }
    if (registerForm.password != repeatPassword.value) {
        ElMessage.error("两次密码不一致");
        return;
    }
    service.post("/registers/userRegister", {
        "phone": registerForm.userId,
        "username": registerForm.userName,
        "password": registerForm.password
    }).then(
        (response) => {
            if(response.data.code == 0){
                ElMessage.success("注册成功");
                registerForm.userId = "";
                registerForm.userName = "";
                registerForm.password = "";
                repeatPassword.value = "";
                router.push("/login")
            }else if(response.data.code == 20005){
                ElMessage.error("用户已存在，请换个用户ID");
                return;
            }
        }
    ).catch(
        () => {
            ElMessage.error("注册请求发送失败，稍后重试");
            return;
        }
    )

}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

#register-container {
    width: 100%;
    height: 100%;
    padding-top: 30vh;
    background-color: #ffffffe6;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#register-form {
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    width: 18rem;
    justify-content: space-between;
    align-items: center;
}

.el-button {
    width: 18rem;
    background-color: #0E1731;
    color: #FFFFFF;
    border-radius: 0.3rem;
}

.el-button:focus {
//background-color: #0E1731;
}

.el-input {
    margin-bottom: 1rem;
}
</style>
