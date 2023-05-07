import {defineStore} from "pinia";

export const UserInfoStore = defineStore("userInfoStore", {
    state: () => {
        return {
            userInfo : {
                "userInfo": {
                    "id": "",
                    "username": "",
                    "phone": ""
                },
                "token": "",
                "roleList": []
            }
        };
    },
    getters: {

    },
    actions: {

    }
});

