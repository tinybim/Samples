<script setup lang="ts">
import { Background, BackgroundType, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

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
        await model.load(new DefaultUrlResolver("/Snowdon Towers Sample Architectural/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv);
            //激活窗口（未激活的视图，不会更新显示模型变化）
            view.active();
        }
        //加载右键菜单，(可以自行创建ContextMenuItem，并加载)
        const menu = new ContextMenu(view);
        DefaultContextMenuItems.forEach(itm=>{
            menu.add_item(itm);
        });        
        //view.render_mode = RenderMode.hlr;
        window.setTimeout(()=>{
            const bk =new Background();
            bk.type = BackgroundType.skybox;
            //bk.image ='/view/tk3.webp';
            bk.sky_box=[
                `/sky2/px.webp`,
                `/sky2/nx.webp`,
                `/sky2/py.webp`,
                `/sky2/ny.webp`,
                `/sky2/pz.webp`,
                `/sky2/nz.webp`
            ]
            view.background = bk;
            // view.set_env(bk.sky_box);
        },1000);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
function set_pbr(){
    view.render_mode = RenderMode.texture;
    const envs=[
        `/sky2/px.webp`,
        `/sky2/nx.webp`,
        `/sky2/py.webp`,
        `/sky2/ny.webp`,
        `/sky2/pz.webp`,
        `/sky2/nz.webp`
    ]
    view.set_env(envs);
}
function set_hlr(){
    view.render_mode = RenderMode.hlr;
    view.set_env(null);
}
function set_tex(){
    view.render_mode = RenderMode.texture;
    view.set_env(null);
}
function set_color(){
    view.render_mode = RenderMode.color;
    view.set_env(null);
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
        <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_pbr">pbr</button>
        <button @click="set_hlr">隐藏线</button>
        <button @click="set_tex">纹理</button>
        <button @click="set_color">颜色</button>
    </div>
</template>