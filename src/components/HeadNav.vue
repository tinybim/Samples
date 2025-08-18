<script lang="ts" setup>
import { ref } from 'vue';
import {GithubOutlined} from '@ant-design/icons-vue'

const home_url =import.meta.env.VITE_HOME_URL;
const samples_url=import.meta.env.VITE_SAMPLES_URL;
const demo_url=import.meta.env.VITE_DEMO_URL;
const console_url=import.meta.env.VITE_CONSOLE_URL;


const activeIndex = ref('1')

const handleSelect = (e: any) => {
    const key = e.key;
    switch (key) {
        case '0':
        case '1': {            
            location.href = home_url;
            break;
        }
        case '2': {
            location.href = samples_url;
            break;
        }
        case '3': {
            location.href = demo_url;
            break;
        }
        case '4': {
            location.href = console_url;
            break;
        }
        case '5': {
            window.open("https://github.com/tinybim/Samples","_blank")
            break;
        }
    }
}
</script>
<template>
    <div class="head">
        <a-menu :default-active="activeIndex" :ellipsis="false" mode="horizontal" @click="handleSelect">
            <a-menu-item key="0" disabled>
                <img height="57px" width="auto" src="/logo.png"></img>
            </a-menu-item>
            <a-menu-item key="1">主页</a-menu-item>
            <a-menu-item key="2">示例文件</a-menu-item>
            <a-menu-item key="3">功能demo</a-menu-item>
            <a-menu-item key="4">控制台</a-menu-item>
            <a-menu-item key="5" style="margin-left: auto;">
                <GithubOutlined style="font-size: x-large;"/>
            </a-menu-item>
        </a-menu>
    </div>
</template>
<style scoped>
.head {
    display: flex;
    background-color: #f1f1ef;
    box-shadow:  0 4px 12px rgba(0, 0, 0, 0.1);
}

.ant-menu {
    width: 100%;
    font-size: x-large;
    align-items: center;
}
</style>