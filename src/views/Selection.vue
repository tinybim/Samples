<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  DefaultUrlResolver, ModelViewType, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/")],div);
        view = app.default_view;
        model = app.create_model();      
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const select=()=>{    
    const e = model.get_element(4954);
    if(e){
        view.selection.select(model,new Uint32Array([e.id]));
    }
}
const select_all=()=>{
    const elements = model.elements;
    view.selection.select(model,elements);
}
const clear=()=>{
    view.selection.clear();
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="select">高亮</button>
        <button @click="select_all">全选</button>
        <button @click="clear">取消高亮</button>
    </div>
</template>