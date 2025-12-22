<script setup lang="ts">
import { CompositeElementUpdater, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ElementAnimation, LinearElementUpdater, ModelViewType, RenderMode, RotateElementUpdater, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import {vec3} from 'gl-matrix';

let app:TinyApp;
let view:UIView;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
        app = new TinyApp({recordable:true});
        console.log("version",app.version);
        const div = dom.value as HTMLDivElement;
        await app.init(div);

        //获取默认窗口
        view = app.default_view;
        //创建模型对象
        model = app.create_model();
        //加载模型
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            await view.attach_view(mv);
            //激活窗口（未激活的视图，不会更新显示模型变化）
            view.active();
        }
        //加载右键菜单，(可以自行创建ContextMenuItem，并加载)
        const menu = new ContextMenu(view);
        DefaultContextMenuItems.forEach(itm=>{
            menu.add_item(itm);
        });   
        window.setTimeout(()=>{
            set_motion();
        },3000);
        
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

const set_motion=()=>{
    const id =[140];//[461];//[210,262];
    // const center = BBox.get_center(model.get_element(461).box);
    const center = new Float32Array([3001.62158203125,16331.576171875,0]);
    // const center = new Float32Array([10000,0,0]);
    // const animation = new ElementAnimation(id,model,new LinearElementUpdater(vec3.fromValues(0,0,10000),10000));
    const move = new LinearElementUpdater(vec3.fromValues(10000,0,0),5000);
    const rotate =  new RotateElementUpdater(center,new Float32Array([0,0,1]),Math.PI,5000);
    const move1 = new LinearElementUpdater(vec3.fromValues(10000,0,0),5000);
    const rotate1 =  new RotateElementUpdater(center,new Float32Array([0,0,1]),Math.PI,5000);
    const c = new CompositeElementUpdater([move,rotate,move1,rotate1]);

    const animation = new ElementAnimation(id,model,c);
    animation.loop = true;
    view.animation_manager.add(animation);
    animation.start();
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>