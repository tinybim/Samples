<script lang="ts" setup>

import {  Box, CategoryFilter, DefaultUrlResolver, FilteredElementCollector, ModelViewType, ParameterFilter, ParameterValueFilter, RayFilter, SelectionMode, StoreyFilter, TinyApp, TypeFilter, type IModel, type UIView } from 'tinybim';
import { onBeforeUnmount, onMounted, ref } from 'vue';

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
        await model.load(new DefaultUrlResolver("/rac_basic_sample_project/"));
        //获取模型中的3d视图
        const mv = model.views.find(v=>v.type == ModelViewType.ThreeD);
        if(mv){
            //将视图加载到窗口中（可以加载多个视图）
            view.attach_view(mv);
            //激活窗口（为激活的视图，不会更新显示模型变化）
            view.active();
            view.selection.selection_mode = SelectionMode.point;
            view.selection.add_selection_action((r)=>{
                console.log(r);
            });            
        }
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const storye_filter=()=>{
    const storey = model.storeys[0];
    if(!storey){
        return;
    }
    view.show_all();
    const filter = new StoreyFilter(model,storey.id);
    const collector =new FilteredElementCollector(model);
    collector.pass(filter);
    const ids = new Uint32Array(collector.get_elements());
    const map = new Map<IModel, Uint32Array | number[]>();
    map.set(model,ids)
    view.isolate(map);
}
const category_filter = ()=>{
    const category = model.categories[0];
    if(!category){
        return;
    }
    const filter =new CategoryFilter(model,category.id);
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map = new Map<IModel, Uint32Array | number[]>([
        [model,ids]
    ]);
    view.isolate(map);
}

const type_filter = ()=>{
    const type = model.types[1];
    if(!type){
        return;
    }
    const filter = new TypeFilter(model,type);
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map = new Map<IModel,Uint32Array|number[]>([
        [model,ids]
    ]);
    view.show_all();
    view.isolate(map);
}
const ray_filter = ()=>{
    const box = view.box;
    const center = new Float32Array([2635,-1715,9000])
    const ray =new RayFilter(center,new Float32Array([0,0,-1]),[model]);
    ray.pass();
    const r = ray.get_results();
    const map = new Map<IModel,number[]>();
    r.forEach(e=>{
        let ids = map.get(e.model);
        if(!ids){
            ids =[];
            map.set(e.model,ids);
        }
        ids.push(e.element);
    });
    view.show_all();
    view.isolate(map);
}
const parameter_filter = async ()=>{
    const defs = await model.get_property_defs();
    const def = defs.find(p=>p.name=="底部约束");
    if(!def){
        return;
    }
    const filter =new ParameterFilter(model,def.id);
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map:Map<IModel,Uint32Array>=new Map([
        [model,ids]
    ]);
    view.show_all();
    view.isolate(map);
}
const parameter_value_filter = async ()=>{
    const defs = await model.get_property_defs();
    const def = defs.find(p=>p.name=="底部约束");
    if(!def){
        return;
    }
    const filter =new ParameterValueFilter(model,def.id,"Level 1");
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map:Map<IModel,Uint32Array>=new Map([
        [model,ids]
    ]);
    view.show_all();
    view.isolate(map);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 20px; left: 250px;">
        <button @click="storye_filter">楼层</button>
        <button @click="category_filter">类别</button>
        <button @click="type_filter">类型</button>
        <button @click="ray_filter">射线</button>
        <button @click="parameter_filter">参数</button>
        <button @click="parameter_value_filter">参数值</button>
    </div>
</template>