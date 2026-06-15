<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  DefaultUrlResolver,   TinyApp, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';

let app:TinyApp;
let view:TinyWindow;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        view = app.default_window;
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>