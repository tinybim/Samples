<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import { Color,   DefaultUrlResolver, FlowSegment, ModelViewType, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';

let app:TinyApp;
let view:UIView;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){      
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/")],div);
        view = app.default_view;
        model = app.get_models()[0];
        await model.load(new DefaultUrlResolver("/Snowdon Towers Sample Plumbing/"));
        view.selection.selection_mode = SelectionMode.element;        
        setTimeout(() => {
            flow();
        }, 1000);
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
let segment:FlowSegment;
const flow=()=>{
    const e = model.get_element(4954);
    const curve = e.location_curve;
    if(!curve){
        return;
    }
    const start = curve.slice(0,3);
    const end = curve.slice(3,6);
    segment = new FlowSegment(start,end,1000,2000,0,500,new Color([255,0,0]));

    view.flow_effects.set(model,e.id,segment);
    view.zoom_elements(new Map([
        [model,[e.id]]
    ]));    
}
const pause = ()=>{
    segment.pause();
}
const restart =()=>{
    segment.restart();
}

const clear =()=>{
    const e = model.get_element(4954);
    view.flow_effects.set(e.model,e.id,null);
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