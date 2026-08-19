<script setup lang="ts">
import { hide_plant, load_tiny_app } from '@/utils/Loader';
import {   DefaultUrlResolver,   TinyApp, type CameraInfo, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';
import { WindowEventKind } from '../dev';
import {mat3, quat, vec3} from 'gl-matrix';

let app:TinyApp;

const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        hide_plant(app);
        app.default_window.shadow = true;       
        app.default_window.event_bus.subscribe(WindowEventKind.Selected,r=>{
            console.log("ssss",r); 
        }) 
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let info:CameraInfo;
const save_view =()=>{
    info = app.default_window.camera.get_info();
}
const set_view=()=>{
    if(info){
        app.default_window.camera.set_info(info);
    }
}
const animate_view =()=>{
    if(info){
        app.default_window.camera.animate(info,1000);
    }
}


</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="save_view">保存视点</button>
        <button @click="set_view">切换视点</button>
        <button @click="animate_view">转到视点</button>
    </div>
</template>