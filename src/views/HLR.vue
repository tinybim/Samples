<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {   DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        win = app.default_window;  
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const set_hlr =()=>{
    win.render_mode = RenderMode.hlr;
    win.set_env(null);
}
const set_color =()=>{
    win.render_mode = RenderMode.color;
}
const set_tex =()=>{
    win.render_mode = RenderMode.texture;
    win.set_env("天空1");
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_hlr">隐藏线</button>       
        <button @click="set_color">颜色</button>  
        <button @click="set_tex">纹理</button>       
    </div>
</template>