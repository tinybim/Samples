<script setup lang="ts">
import { DefaultUrlResolver, ModelViewType, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
        app = new TinyApp({recordable:true});
        const div = dom.value as HTMLDivElement;
        await app.init(div);

        //获取默认窗口
        view = app.default_view;
        //创建模型对象
        let model = app.create_model();
        //加载模型
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(!mv){
            return
        } 
        //将视图加载到窗口中（可以加载多个视图）
        view.attach_view(mv);
        //激活窗口（未激活的视图，不会更新显示模型变化）
        view.active();       
        const label = document.createElement("div");
        label.innerText ="test label";
        view.label_manager.create("test",label,model.box.slice(3,6));
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;">

    </div>
</template>
<style scoped>
</style>