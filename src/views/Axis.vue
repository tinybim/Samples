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
        //初始化
        
        const div = dom.value as HTMLDivElement;
        await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);

        //获取默认窗口
        view = app.default_view;
        //创建模型对象
        let model = app.get_models()[0];
        //加载模型
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv);
            //激活窗口（未激活的视图，不会更新显示模型变化）
            view.active();
            const dwg = model.views.find(v=>v.type == ModelViewType.Floor);
            if(dwg){
                await view.attach_view(dwg);                
            }

            axis = view.axis;
            axis.active(dwg);
            axis.set_position(dwg.origin);

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