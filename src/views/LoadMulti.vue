<script setup lang="ts">
import { ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted } from 'vue';

let app:TinyApp;
let view:UIView;
onMounted(async ()=>{
    if(!app){
        //初始化
        app = new TinyApp({recordable:true});
        const div = document.getElementById("app_id") as HTMLDivElement;
        await app.init(div);

        //获取默认窗口
        view = app.default_view;
        //激活窗口（未激活的视图，不会更新显示模型变化）
        view.active();
        //创建模型对象
        const model1 = app.create_model();
        //加载模型
        await model1.load(new DefaultUrlResolver("/Snowdon Towers Sample Architectural/"));
        //获取模型中的3d视图
        const mv1 = model1.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv1){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv1); 
        }

        const model2 = app.create_model();
        await model2.load(new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/"));

        const mv2 = model2.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv2){
            view.attach_view(mv2);
        }

        //加载右键菜单，(可以自行创建ContextMenuItem，并加载)
        const menu = new ContextMenu(view);
        DefaultContextMenuItems.forEach(itm=>{
            menu.add_item(itm);
        });
        
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

</script>
<template>
    <div id="app_id" style="width: 100%;height: 100%;"></div>
</template>