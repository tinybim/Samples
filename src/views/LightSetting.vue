<script setup lang="ts">

import { Color, DefaultUrlResolver, ModelViewType, TinyApp, type UIView } from '../dev';
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
        //激活窗口（为激活的视图，不会更新显示模型变化）
        view.active();
        const light = view.light;
        if(ambient_color.value){
            const input = ambient_color.value;
            input.value = light.ambient.to_hex_rgb();
            input.addEventListener("change",()=>{
                light.ambient = new Color(input.value)
            })
        }

        if(ambient_rd.value){
            const input = ambient_rd.value;
            input.value = `${light.ambient_radiance}`;
            input.addEventListener("change",()=>{
                light.ambient_radiance = parseFloat(input.value);
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
            input.value = `${light.sunlight.radiance}`;
            input.addEventListener("change",()=>{
                light.sunlight.radiance = parseFloat(input.value);
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