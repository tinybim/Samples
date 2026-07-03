<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import { Color,   DefaultUrlResolver, FlowSegment, ModelViewType, SelectionMode, TinyApp, type IModel, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

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
        win.selection.selection_mode = SelectionMode.element;        
        setTimeout(() => {
            flow();
        }, 1000);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let segments:FlowSegment[]=[];
const flow=()=>{
    const ids = [4954,4930,4953];
    const color = new Color([64, 164, 223]);
    for(let i=0;i<ids.length;i++){
        const e = model.get_element(ids[i]);
        const curve = e.location_curve;
        if(!curve){
            return;
        }
        const start = curve.slice(0,3);
        const end = curve.slice(3,6);
        if(i===0){
            segments[i] = new FlowSegment(start,end,1000,2000,0,500,color);
        }
        else{
            segments[i] = new FlowSegment(end,start,1000,2000,0,500,color);
        }
        win.flow_effects.set(model,e.id,segments[i]);
    }

    win.zoom_elements(new Map([
        [model,ids]
    ]));    
}
const pause = ()=>{
    segments.forEach(s=>{
        s.pause();
    });
}
const restart =()=>{
    segments.forEach(s=>{
        s.restart();
    });
}

const clear =()=>{
    const ids = [4954,4930,4953];
    ids.forEach(id => {
        // const e = model.get_element(id);
        win.flow_effects.set(model,id,null);
    });
}
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="flow">流动</button>
        <button @click="pause">暂停</button>
        <button @click="restart">重启</button>
        <button @click="clear">清空</button>
    </div>
</template>