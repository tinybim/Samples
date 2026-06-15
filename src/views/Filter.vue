<script lang="ts" setup>

import { load_tiny_app } from '@/utils/Loader';
import {  BBox, CategoryFilter, DefaultUrlResolver, FilteredElementCollector, ModelViewType, ParameterFilter, ParameterValueFilter, RayFilter, SelectionMode, StoreyFilter, TinyApp, TypeFilter, type IModel, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化        
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div); 
        win = app.default_window;
        model = app.get_models()[0];
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
    win.show_all();
    const filter = new StoreyFilter(model,storey.id);
    const collector =new FilteredElementCollector(model);
    collector.pass(filter);
    const ids = new Uint32Array(collector.get_elements());
    const map = new Map<IModel, Uint32Array | number[]>();
    map.set(model,ids)
    win.isolate(map);
}
const category_filter = ()=>{
    const category = model.categories.find(c=>c.name=="墙");
    if(!category){
        return;
    }
    const filter =new CategoryFilter(model,category.id);
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map = new Map<IModel, Uint32Array | number[]>([
        [model,ids]
    ]);
    win.isolate(map);
}

const type_filter = ()=>{
    const type = model.types[8];
    if(!type){
        return;
    }
    const filter = new TypeFilter(model,type);
    const collector = new FilteredElementCollector(model);
    const ids = new Uint32Array(collector.pass(filter).get_elements());
    const map = new Map<IModel,Uint32Array|number[]>([
        [model,ids]
    ]);
    win.show_all();
    win.isolate(map);
}
const ray_filter = ()=>{
    const box = win.box;
    const center = new Float32Array([2635,-1715,9000])
    const ray =new RayFilter(center,new Float32Array([0,0,-1]),[model],win);
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
    win.show_all();
    win.isolate(map);
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
    win.show_all();
    win.isolate(map);
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
    win.show_all();
    win.isolate(map);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="storye_filter">楼层</button>
        <button @click="category_filter">类别</button>
        <button @click="type_filter">类型</button>
        <button @click="ray_filter">射线</button>
        <button @click="parameter_filter">参数</button>
        <button @click="parameter_value_filter">参数值</button>
    </div>
</template>