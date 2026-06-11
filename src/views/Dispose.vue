<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {   DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

let app:TinyApp|null;
let view:UIView|null;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){

        const div = dom.value as HTMLDivElement;
        app =await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        //获取默认窗口
        view = app.default_view;
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
function dispose(){
    app?.dispose();
    app = null;
    view=null;
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="dispose">销毁场景</button>

    </div>
</template>