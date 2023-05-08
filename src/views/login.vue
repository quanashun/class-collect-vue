<template>
    <div id="login-container">
        <div>
            <h1>管理后台</h1>
        </div>
        <div id="login-form">
            <el-input v-model="loginForm.userId" placeholder="用户ID" style="margin-top: 2rem"/>
            <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="密码"
                    show-password
            />
            <div>
                <el-button round @click="login">登录</el-button>
            </div>
            <el-divider/>
            <h6>还没账号，
                <router-link to="/register">去注册？</router-link>
            </h6>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import service from "../utils/request.ts";
import router from "../router";

let loginForm = reactive({"userId": "", "password": ""})
let login = function () {
    if (loginForm.userId.length < 1) {
        ElMessage.error("请输入用户ID");
        return;
    }
    if (loginForm.password.length < 1) {
        ElMessage.error("请输入密码");
        return;
    }
    service.post("/logins/userPasswordLogin", {
        "username": loginForm.userId,
        "password": loginForm.password
    }).then(
            (response) => {
                if (response.data.code == 0) {
                    ElMessage.success("登录成功");
                    localStorage.setItem("login_user_info", JSON.stringify(response.data.data));
                    loginForm.userId = "";
                    loginForm.password = "";
                    router.push("/console/class-collect")
                } else {
                    ElMessage.error("用户名或密码错误")
                }
            }
        ).catch(
        () => {
            ElMessage.error("登录请求发送失败，稍后重试");
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

#login-container {
    width: 100%;
    height: 100%;
    padding-top: 30vh;
    background-color: #ffffffe6;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#login-form {
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
