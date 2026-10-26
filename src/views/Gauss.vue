<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  CameraType, DefaultUrlResolver,GaussType,TinyApp } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';
import {mat4, quat} from "gl-matrix";

let app:TinyApp;

const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        const win = app.default_window;
        const rp = await fetch("/gauss/fruit.spz");
        const buffer =await rp.arrayBuffer();
        const qt = quat.rotateX(quat.create(),quat.create(),-Math.PI*0.5);
        let tf = mat4.fromRotationTranslationScale(mat4.create(),qt,[0,-10000,5000],[10000,10000,10000]);

        const gauss = await win.gauss_manager.add({
            name:"ttt",
            data:buffer,
            tf,
            type:GaussType.Spz
        });


        win.camera.type = CameraType.Perspective;
     }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>

</template>