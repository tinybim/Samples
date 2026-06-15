<script setup lang="ts">

import { load_tiny_app } from '@/utils/Loader';
import { Color, DefaultUrlResolver, ModelViewType, TinyApp, type TinyWindow } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let app:TinyApp;
let win:TinyWindow;
const dom=ref<HTMLDivElement>();
onMounted(async ()=>{
    if(!app){
        //初始化
        
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);

        win = app.default_window;
 

        const light = win.light;
        if(ambient_color.value){
            const input = ambient_color.value;
            input.value = light.ambient.to_hex_rgb();
            input.addEventListener("change",()=>{
                light.ambient = new Color(input.value)
            })
        }

        if(ambient_rd.value){
            const input = ambient_rd.value;
            input.value = `${light.ambient_intensity}`;
            input.addEventListener("change",()=>{
                light.ambient_intensity = parseFloat(input.value);
            })
        }

        if(sunlight_color.value){
            const input = sunlight_color.value;
            input.value = light.sunlight.color.to_hex_rgb();
            input.addEventListener("change",()=>{
                light.sunlight.color = new Color(input.value)
            })
        }

        if(sunlight_rd.value){
            const input = sunlight_rd.value;
            input.value = `${light.sunlight.intensity}`;
            input.addEventListener("change",()=>{
                light.sunlight.intensity = parseFloat(input.value);
            })
        }

        if(sunlight_phi.value){
            const input = sunlight_phi.value;
            input.value = `${light.sunlight.phi}`;
            input.addEventListener("change",()=>{
                light.sunlight.phi = parseFloat(input.value);
            })
        }
        if(sunlight_theta.value){
            const input = sunlight_theta.value;
            input.value = `${light.sunlight.theta}`;
            input.addEventListener("change",()=>{
                light.sunlight.theta = parseFloat(input.value);
            })
        }
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});

const ambient_color = ref<HTMLInputElement>();
const ambient_rd =ref<HTMLInputElement>();

const sunlight_color = ref<HTMLInputElement>();
const sunlight_rd = ref<HTMLInputElement>();
const sunlight_theta = ref<HTMLInputElement>();
const sunlight_phi = ref<HTMLInputElement>();
</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;">

    </div>
    <div style="position:fixed; top: 100px; left: 150px;display: grid; grid-template-columns: auto auto;background: white;">
        <div>环境光:</div>
        <div style="display: grid; grid-template-columns: auto auto;">
            <div>颜色</div>
            <div>
                <input ref="ambient_color" type="color">
            </div>
            <div>强度</div>
            <div>
                <input ref="ambient_rd" type="number" min="1" max="10" step="0.1">
            </div>
        </div>
        <div>太阳光:</div>
        <div style="display: grid;grid-template-columns: auto auto;">
            <div>颜色</div>
            <div>
                <input ref="sunlight_color" type="color">
            </div>
            <div>强度</div>
            <div>
                <input ref="sunlight_rd" type="number" min="1" max="10" step="0.1">
            </div>
            <div>入射角度X</div>
            <div>
                <input ref="sunlight_phi" type="number" min="0" max="360" step="1">
            </div>
            <div>入射角度Z</div>
            <div>
                <input ref="sunlight_theta" type="number" min="0" max="180" step="1">
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>