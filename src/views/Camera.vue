<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  BBox, CameraInfo, CameraType,   DefaultUrlResolver, ModelViewType, RenderMode, TinyApp, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
       
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);

        //获取默认窗口
        win = app.default_window;
        //创建模型对象
        let model = app.get_models()[0]
        //加载模型

        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            win.attach_view(mv);
            //激活窗口（未激活的视图，不会更新显示模型变化）
            win.active();
        }
        //加载右键菜单，(可以自行创建ContextMenuItem，并加载)  
        //view.render_mode = RenderMode.hlr;
        win.camera.type = CameraType.Perspective;
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let rotation_id=0;
const rotate_x =()=>{
    const center = BBox.get_center(win.box);
    rotation_id =window.setInterval(()=>{
        
        win.camera.rotate(0,1/180,center);
    },40);
    
}
const cancel_rotation=()=>{
    window.clearInterval(rotation_id);
}

let camera_info:CameraInfo;
const set_camera_info=()=>{
    camera_info = win.camera.get_info();
}
const use_camera_info=()=>{
    win.camera.set_info(camera_info);
}
const animate_camera_info=()=>{
    win.camera.animate(camera_info,500);
}
const switch_camera=()=>{
    win.camera.type = win.camera.type == CameraType.Perspective?CameraType.Orthometric:CameraType.Perspective;
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="rotate_x">绕z轴旋转</button>       
        <button @click="cancel_rotation">取消旋转</button> 
        <button @click="set_camera_info">记录相机</button>     
        <button @click="use_camera_info">设置相机</button> 
        <button @click="animate_camera_info">转到相机</button>  
        <button @click="switch_camera">切换</button>      
    </div>
</template>