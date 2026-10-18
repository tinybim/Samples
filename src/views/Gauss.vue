<!-- <script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  DefaultUrlResolver,TinyApp } from '../dev';
import { onBeforeUnmount, onMounted,  ref } from 'vue';


let app:TinyApp;

const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        const win = app.default_window;
        win.add_gauss("/test/gaussian_splat_data/bonsai/bonsai_trimmed.splat");
     }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const test=()=>{
    app.default_window.test();
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="test">test</button>       
  
    </div>
</template> -->