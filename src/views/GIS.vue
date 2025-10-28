<script setup lang="ts">
import { CachedTiandituLoader } from '@/utils/CachedTiandituLoader';
import { CameraType, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
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
        view.camera.type = CameraType.Perspective;
        //创建模型对象
        let model = app.create_model();
        //加载模型
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
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
            const image_layer = view.gis_manager.image_layer;
            image_layer.set_layer(new CachedTiandituLoader("501f663c21c442af3ae1b7246bbbae8f"));
            image_layer.set_location(104.066,30.66,-10000);
            image_layer.enable = true;
        },2000);

    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const set_chengdu=()=>{
    const image_layer = view.gis_manager.image_layer;
    image_layer?.set_location(104.066,30.66,-10000);
}
const set_beijing=()=>{
    const image_layer = view.gis_manager.image_layer;
    image_layer?.set_location(116.3912757,39.906217,-10000);
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_chengdu">成都</button>       
        <button @click="set_beijing">北京</button>  
    </div>
</template>