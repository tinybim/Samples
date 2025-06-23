<script setup lang="ts">
import { ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, Plane, SelectionMode, TinyApp, type UIView } from '../dev';
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
            //激活窗口（为激活的视图，不会更新显示模型变化）
            view.active();

            //设置选择模式为元素选择
            view.selection.selection_mode = SelectionMode.element;
            //添加选择事件
            view.selection.add_selection_action(r=>{
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

const plan_section=()=>{
    //获取视图范围框的最大点
    const tp = view.box.slice(3,6);
    tp[2] = tp[2]/3; //z值变缩小，
    const plane = new Plane(tp,new Float32Array([0,0,1]));
    view.section.set_plane(plane);
}
const box_section=()=>{
    const box = view.box;
    box[5] = box[5]/3;
    view.section.set_box(box);
}
const active_section=()=>{
    view.section.active();
}
const deactive_section=()=>{
    view.section.deactive();
}

const close_section =()=>{
    view.section.reset();
    view.section.deactive();
}

</script>
<template>
    <div style="width: 100%;height: 100%;">
        <div ref="dom" style="width: 100%;height: 100%;"></div>
        <div style="position:fixed; top: 20px; left: 250px;">
            <button @click="box_section">范围框剖切</button>
            <button @click="plan_section">面剖切</button>
            <button @click="active_section">激活剖切</button>
            <button @click="deactive_section">隐藏剖切</button>
            <button @click="close_section">关闭剖切</button>
        </div>
    </div>


</template>