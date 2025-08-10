<script setup lang="ts">
import { Background, BackgroundType, Color, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, FireCreateInfo, ModelViewType, RenderMode, SelectionMode, TinyApp, type IFire, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
const dom=ref<HTMLDivElement>();
let fire:IFire;
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
        const bk =new Background();
        bk.type = BackgroundType.color;
        bk.color = new Color([20,20,20]);  
        view.background = bk;
        view.light.ambient = new Color([20,20,20]);      
        view.light.sunlight.color = new Color([20,20,20])
        //view.render_mode = RenderMode.hlr;
        view.selection.add_selection_action(r=>{
            console.log(r);
        })
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

async function add_fire() {
    if (fire) {
        return;
    }
    if (view) {
        const p = new Float32Array([8913, 18590, 3000]);
        fire = await view.add_fire(new FireCreateInfo(p, 1000, 40, 100000, 2, 5, 10, 1000, 1000))
    }
}

function reduce_intensity() {
    if(!fire){
        return;
    }
    const it = fire.get_intensity();
    fire.set_intensity(it*0.9);
}

function add_intensity() {
    if(!fire){
        return;
    }
    const it = fire.get_intensity();
    fire.set_intensity(Math.min(it*1.1,1.0));
}
function add_attenuation(){
    if(!fire){
        return;
    }
    const at = fire.get_attenuation();
    fire.set_attenuation(at+1);
}
function reduce_attenuation(){
    if(!fire){
        return;
    }
    const at = fire.get_attenuation();
    fire.set_attenuation(at-1);
}
function add_speed(){
    if(!fire){
        return;
    }
    const speed = fire.get_speed();
    fire.set_speed(speed*1.5);
}
function reduce_speed(){
    if(!fire){
        return;
    }
    const speed = fire.get_speed();
    fire.set_speed(speed*0.5);
}

function add_divergency(){
    if(!fire){
        return;
    }
    const d = fire.get_divergency();
    fire.set_divergency(d+100);
}
function reduce_divergency(){
    if(!fire){
        return;
    }
    const d = fire.get_divergency();
    fire.set_divergency(d-100);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="add_fire">添加火焰</button>
        <button @click="reduce_intensity">reduce_intensity</button>
        <button @click="add_intensity">add_intensity</button>
        <button @click="add_attenuation">add_attenuation</button>
        <button @click="reduce_attenuation">reduce_attenuation</button>

        <button @click="add_speed">add_speed</button>
        <button @click="reduce_speed">reduce_speed</button>

        <button @click="add_divergency">add_divergency</button>
        <button @click="reduce_divergency">reduce_divergency</button>
    </div>
</template>