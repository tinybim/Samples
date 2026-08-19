<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  DefaultUrlResolver,   TinyApp } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';


let app:TinyApp;

const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/小别墅/")],div);
        app.default_window.shadow = true;
        app.default_window.cull_back =false;
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>