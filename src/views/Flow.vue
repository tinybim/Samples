<script setup lang="ts">
import { Color, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, FlowSegment, ModelViewType, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

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
let segment:FlowSegment;
const flow=()=>{
    const e = model.get_element(4954);
    const curve = e.location_curve;
    if(!curve){
        return;
    }
    const start = curve.slice(0,3);
    const end = curve.slice(3,6);
    segment = new FlowSegment(start,end,1000,2000,0,500,new Color([255,0,0]));

    view.flow_effects.set(model,e.id,segment);
    view.zoom_elements(new Map([
        [model,[e.id]]
    ]));    
}
const pause = ()=>{
    segment.pause();
}
const restart =()=>{
    segment.restart();
}

const clear =()=>{
    const e = model.get_element(4954);
    view.flow_effects.set(e.model,e.id,null);
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="flow">流动</button>
        <button @click="pause">暂停</button>
        <button @click="restart">重启</button>
        <button @click="clear">清空</button>
    </div>
</template>