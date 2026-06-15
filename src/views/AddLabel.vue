<script setup lang="ts">

import {   DefaultUrlResolver, TinyApp, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { ILabel } from 'tinybim';
import { load_tiny_app } from '@/utils/Loader';

let app:TinyApp;
let win:TinyWindow;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        win =app.default_window;
        window.setTimeout(add_label,3000);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let label:ILabel;
const add_label=()=>{
    const dom = document.createElement("div");
    dom.innerHTML =`<svg class="icon" viewBox="0 0 1024 1024" width="40" height="40"><path d="M512.434393 66.861804c-0.054235 0-0.109494 0-0.163729 0l-0.541329 0c-0.056282 0-0.109494 0-0.163729 0-191.363376 0.434905-346.930477 156.1115-346.930477 347.637582 0 188.810227 119.553886 338.510714 326.018192 532.535709 0.325411 0.434905 0.434905 0.977257 0.814552 1.302669 3.042289 3.260254 6.735401 5.432733 10.646478 6.843872 0.923022 0.325411 1.954515 0.325411 2.933819 0.543376 2.226714 0.542352 4.399193 1.412163 6.681166 1.412163 0.107447 0 0.161682-0.10847 0.270153-0.10847 0.109494 0 0.163729 0.10847 0.272199 0.10847 2.281973 0 4.455475-0.86981 6.681166-1.412163 0.977257-0.217964 2.010797-0.217964 2.933819-0.543376 3.90903-1.412163 7.605212-3.584642 10.646478-6.843872 0.379647-0.325411 0.488117-0.868787 0.813528-1.302669 206.464305-194.024995 326.019215-343.725482 326.019215-532.535709C859.364871 222.973304 703.796746 67.296709 512.434393 66.861804zM511.998465 596.247776c-101.193727 0-183.541223-82.347496-183.541223-183.596482 0-101.247962 82.347496-183.486988 183.541223-183.486988 101.195773 0 183.541223 82.238003 183.541223 183.486988C695.539688 513.901303 613.194238 596.247776 511.998465 596.247776z" fill="#f4ea2a"></path></svg>`;
    dom.style.transform ='translateY(-100%) translateX(-50%)'
    label = win.label_manager.create("test",dom,new Float32Array([3092.981689453125,16468.2578125,4502.5]));
}
const delete_label=()=>{
    win.label_manager.remove(label.id);
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;">

    </div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="add_label">添加标签</button>       
        <button @click="delete_label">删除标签</button>  
    </div>
</template>
<style scoped>
</style>