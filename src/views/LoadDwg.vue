<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import { DefaultUrlResolver, ModelViewType, Plane, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
const dom = ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
        
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);

        //获取默认窗口
        view = app.default_view;
        const model = app.get_models()[0]; 

        const dwg = model.views.find(v=>v.type == ModelViewType.Floor);
        if(dwg){
            await view.attach_view(dwg);
            view.section.set_plane(new Plane(dwg.origin,dwg.normal));
        }
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>