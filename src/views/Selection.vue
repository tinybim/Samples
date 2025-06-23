<script setup lang="ts">
import {  DefaultUrlResolver, ModelViewType, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
let model:IModel;
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
        model = app.create_model();
        //加载模型
        await model.load(new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv);
            //激活窗口（为激活的视图，不会更新显示模型变化）
            view.active();
            view.selection.selection_mode = SelectionMode.element;
            view.selection.add_selection_action((r)=>{
                console.log(r);
            });
            
        }        
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const select=()=>{    
    const e = model.get_element(4954);
    if(e){
        view.selection.select(model,new Uint32Array([e.id]));
    }
}
const select_all=()=>{
    const elements = model.elements;
    view.selection.select(model,elements);
}
const clear=()=>{
    view.selection.clear();
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 20px; left: 250px;">
        <button @click="select">高亮</button>
        <button @click="select_all">全选</button>
        <button @click="clear">取消高亮</button>
    </div>
</template>