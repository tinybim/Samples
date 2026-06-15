<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import {  DefaultUrlResolver, ModelViewType, SelectionMode, TinyApp, type IModel, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/")],div);
        win = app.default_window;
        model = app.get_models()[0];      
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const select=()=>{    
    const e = model.get_element(4954);
    if(e){
        win.selection.select(model,new Uint32Array([e.id]));
    }
}
const select_all=()=>{
    const elements = model.elements;
    win.selection.select(model,elements);
}
const clear=()=>{
    win.selection.clear();
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