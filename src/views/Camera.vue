<script setup lang="ts">
import {  BBox, CameraInfo, CameraType, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type UIView } from '../dev';
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
        view.camera.type = CameraType.Perspective;
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let rotation_id=0;
const rotate_x =()=>{
    const center = BBox.get_center(view.box);
    rotation_id =window.setInterval(()=>{
        
        view.camera.rotate(0,1/180,center);
    },40);
    
}
const cancel_rotation=()=>{
    window.clearInterval(rotation_id);
}

let camera_info:CameraInfo;
const set_camera_info=()=>{
    camera_info = view.camera.get_info();
}
const use_camera_info=()=>{
    view.camera.set_info(camera_info);
}
const animate_camera_info=()=>{
    view.camera.animate(camera_info,500);
}
const switch_camera=()=>{
    view.camera.type = view.camera.type == CameraType.Perspective?CameraType.Orthometric:CameraType.Perspective;
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 20px; left: 250px;">
        <button @click="rotate_x">绕z轴旋转</button>       
        <button @click="cancel_rotation">取消旋转</button> 
        <button @click="set_camera_info">记录相机</button>     
        <button @click="use_camera_info">设置相机</button> 
        <button @click="animate_camera_info">转到相机</button>  
        <button @click="switch_camera">切换</button>      
    </div>
</template>