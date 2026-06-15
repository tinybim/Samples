<script setup lang="ts">
import { load_tiny_app } from "@/utils/Loader";
import {  DefaultUrlResolver, ModelViewType, TinyApp, type IAxis, type TinyWindow } from "../dev";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
let axis:IAxis;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){       
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        win = app.default_window;
        let model = app.get_models()[0];
        const dwg = model.views.find(v=>v.type == ModelViewType.Floor);
        await win.attach_view(dwg);        
        axis = win.axis;
        axis.active(dwg);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>