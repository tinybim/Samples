<script setup lang="ts">
import { Background, BackgroundType, CameraType, Color, ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, MaterialScope, MaterialType, ModelViewType, RenderMode, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onMounted, ref } from 'vue';


const dom=ref<HTMLDivElement>();

let app:TinyApp;
let view:UIView;
let model:IModel;

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
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv);
            //激活窗口（为激活的视图，不会更新显示模型变化）
            view.active();
            view.selection.selection_mode = SelectionMode.element;
            //view.camera_type = CameraType.Perspective;
            view.selection.add_selection_action(s=>{
                console.log(s);
            })
            //view.render_mode = RenderMode.texture;
            //view.light.ambient = new Color([10,10,10]);
            const contex_menu =  new ContextMenu(view);
            const items = DefaultContextMenuItems;
            items.forEach(it=>{
                contex_menu.add_item(it);
            });
        }  
        setTimeout(() => {
            const bk = new Background();
            bk.type = BackgroundType.color;
            bk.color = new Color([0,0,0]);
            view.background = bk;
            
            view.light.ambient = new Color([0,0,0]);
            view.light.sunlight.color =new Color([0,0,0]);
        }, 10);

    }
});

const set_material =()=>{
    const mt = model.create_material("test",new Color([100,100,100]),1,0,MaterialType.Emissive_Bloom);
    const e = model.get_element(461);
    model.set_material([313],mt,MaterialScope.element);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 20px; left: 250px;">
        <button @click="set_material">设置</button>       
    </div>
</template>
