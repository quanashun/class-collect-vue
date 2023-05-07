import {defineStore} from "pinia";

export const leftSideBarStore = defineStore("leftSideBarStore", {
    state: () => {
        return {
            isCollapse: false
        };
    },
    getters: {

    },
    actions: {
        reviseCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    }
});

