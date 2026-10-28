<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  Background, BackgroundType, CameraType, Color, DefaultUrlResolver,GaussType,TinyApp, type CameraInfo } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';
import {mat4, quat} from "gl-matrix";

let app:TinyApp;

const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        const win = app.default_window;
        const rp = await fetch("/gauss/ceramic.spz");
        const buffer =await rp.arrayBuffer();
        const qt = quat.rotateX(quat.create(),quat.create(),-Math.PI*0.5);
        let tf = mat4.fromRotationTranslationScale(mat4.create(),qt,[0,-10000,5000],[20000,20000,20000]);

        const gauss = await win.gauss_manager.add({
            name:"ttt",
            data:buffer,
            tf,
            type:GaussType.Spz
        });
        const info:CameraInfo={
            type:CameraType.Roaming,
            eye:[-2385.37744140625,-121881.2265625,4524.5888671875],
            up:[0,0,1],
            direction:[0,1,0],
            viewport:null
        };
        win.camera.set_info(info);
        const bk = new Background();
        bk.type = BackgroundType.color;
        bk.color = new Color([0,0,0]);
        win.background = bk;
     }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
// const test=()=>{
//     const info = app.default_window.camera.get_info();
//     console.log(info);
// }
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <!-- <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="test">test</button>
    </div> -->
    
</template>