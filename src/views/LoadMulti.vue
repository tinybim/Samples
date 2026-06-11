<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {   DefaultUrlResolver, ModelViewType, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted } from 'vue';

let app:TinyApp;

onMounted(async ()=>{
    if(!app){  
        const div = document.getElementById("app_id") as HTMLDivElement;
        app = await load_tiny_app([
            new DefaultUrlResolver("/Snowdon Towers Sample Architectural/"),
            new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/")
        ],div);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div id="app_id" style="width: 100%;height: 100%;"></div>
</template>