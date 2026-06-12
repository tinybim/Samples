<script setup lang="ts">
import { load_tiny_app } from "@/utils/Loader";
import {  DefaultUrlResolver, ModelViewType, TinyApp, type IAxis, type UIView } from "../dev";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
let axis:IAxis;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){       
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        view = app.default_view;
        let model = app.get_models()[0];
        const dwg = model.views.find(v=>v.type == ModelViewType.Floor);
        await view.attach_view(dwg);        
        axis = view.axis;            
        axis.set_position(dwg.origin);
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