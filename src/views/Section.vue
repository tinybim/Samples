<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import { DefaultUrlResolver, ModelViewType, Plane, SelectionMode, TinyApp, type TinyWindow } from '../dev';
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

const plan_section=()=>{
    //获取视图范围框的最大点
    const tp = win.box.slice(3,6);
    tp[2] = tp[2]/3; //z值变缩小，设置剖面原点z值
    const plane = new Plane(tp,new Float32Array([0,0,1]));
    win.section.set_plane(plane);
}
const box_section=()=>{
    const box = win.box;
    box[5] = box[5]/3;
    win.section.set_box(box);
}
const active_section=()=>{
    win.section.active();
}
const deactive_section=()=>{
    win.section.deactive();
}

const close_section =()=>{
    win.section.reset();
    win.section.deactive();
}

</script>
<template>
    <div style="width: 100%;height: 100%;">
        <div ref="dom" style="width: 100%;height: 100%;"></div>
        <div style="position:fixed; top: 100px; left: 250px;">
            <button @click="box_section">范围框剖切</button>
            <button @click="plan_section">面剖切</button>
            <button @click="active_section">激活剖切</button>
            <button @click="deactive_section">隐藏剖切</button>
            <button @click="close_section">关闭剖切</button>
        </div>
    </div>


</template>