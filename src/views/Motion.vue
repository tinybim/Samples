<script setup lang="ts">
import { CompositeElementUpdater,   DefaultUrlResolver, ElementAnimation, LinearElementUpdater, ModelViewType, RenderMode, RotateElementUpdater, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import {vec3} from 'gl-matrix';
import { load_tiny_app } from '@/utils/Loader';

let app:TinyApp;
let view:UIView;
let model:IModel;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){        
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        view = app.default_view;
        model = app.get_models()[0];
        window.setTimeout(()=>{
            set_motion();
        },3000);        
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

const set_motion=()=>{
    const id =[140];
    const center = new Float32Array([3001.62158203125,16331.576171875,0]);
    const move = new LinearElementUpdater(vec3.fromValues(10000,0,0),5000);
    const rotate =  new RotateElementUpdater(center,new Float32Array([0,0,1]),Math.PI,5000);
    const move1 = new LinearElementUpdater(vec3.fromValues(10000,0,0),5000);
    const rotate1 =  new RotateElementUpdater(center,new Float32Array([0,0,1]),Math.PI,5000);
    const c = new CompositeElementUpdater([move,rotate,move1,rotate1]);

    const animation = new ElementAnimation(id,model,c);
    animation.loop = true;
    view.animation_manager.add(animation);
    animation.start();
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
</template>