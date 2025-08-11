<script setup lang="ts">
import type { ISelected } from '@/lib';
import { ContextMenu, DefaultContextMenuItems, DefaultUrlResolver, ModelViewType, TinyApp, type UIView } from '../dev';
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
        if(!mv){
            return
        } 
        //将视图加载到窗口中（可以加载多个视图）
        view.attach_view(mv);
        //激活窗口（未激活的视图，不会更新显示模型变化）
        view.active();       
        const label = document.createElement("div");
        label.innerHTML =`<svg class="icon" viewBox="0 0 1024 1024" width="40" height="40"><path d="M512.434393 66.861804c-0.054235 0-0.109494 0-0.163729 0l-0.541329 0c-0.056282 0-0.109494 0-0.163729 0-191.363376 0.434905-346.930477 156.1115-346.930477 347.637582 0 188.810227 119.553886 338.510714 326.018192 532.535709 0.325411 0.434905 0.434905 0.977257 0.814552 1.302669 3.042289 3.260254 6.735401 5.432733 10.646478 6.843872 0.923022 0.325411 1.954515 0.325411 2.933819 0.543376 2.226714 0.542352 4.399193 1.412163 6.681166 1.412163 0.107447 0 0.161682-0.10847 0.270153-0.10847 0.109494 0 0.163729 0.10847 0.272199 0.10847 2.281973 0 4.455475-0.86981 6.681166-1.412163 0.977257-0.217964 2.010797-0.217964 2.933819-0.543376 3.90903-1.412163 7.605212-3.584642 10.646478-6.843872 0.379647-0.325411 0.488117-0.868787 0.813528-1.302669 206.464305-194.024995 326.019215-343.725482 326.019215-532.535709C859.364871 222.973304 703.796746 67.296709 512.434393 66.861804zM511.998465 596.247776c-101.193727 0-183.541223-82.347496-183.541223-183.596482 0-101.247962 82.347496-183.486988 183.541223-183.486988 101.195773 0 183.541223 82.238003 183.541223 183.486988C695.539688 513.901303 613.194238 596.247776 511.998465 596.247776z" fill="#f4ea2a"></path></svg>`;
        // label.innerText ="car";
        // label.style.backgroundColor ="#FFFFFF";
        // label.translate =
        label.style.transform ='translateY(-100%) translateX(-50%)'
        view.label_manager.create("test",label,new Float32Array([3092.981689453125,16468.2578125,4502.5]));

        view.selection.add_selection_action((r:ISelected)=>{
            console.log(r);
        })

        const menu = new ContextMenu(view);
        DefaultContextMenuItems.forEach(itm=>{
            menu.add_item(itm);
        });  
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;">

    </div>
</template>
<style scoped>
</style>