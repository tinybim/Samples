<script setup lang="ts">
import { load_tiny_app } from '@/utils/Loader';
import { Background, BackgroundType, Color, DefaultUrlResolver, MaterialScope, MaterialType, ModelViewType, RenderMode, SelectionMode, TinyApp, type IModel, type UIView } from '../dev';
import { onBeforeUnmount, onMounted, ref } from 'vue';


const dom=ref<HTMLDivElement>();

let app:TinyApp;
let view:UIView;
let model:IModel;

onMounted(async ()=>{
    if(!app){        
        const div = dom.value as HTMLDivElement;
        app = await load_tiny_app([new DefaultUrlResolver("/rac_basic_sample_project/")],div);
        view = app.default_view;
        model = app.get_models()[0]; 
        setTimeout(() => {
            const bk = new Background();
            bk.type = BackgroundType.color;
            bk.color = new Color([0,0,0]);
            view.background = bk;
            
            view.light.ambient = new Color([50,50,50]);
            view.light.sunlight.color =new Color([0,0,0]);
        }, 10);

    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const set_material =()=>{
    const mt = model.create_material("test",new Color([255,255,255,30]),0.5,0.5,MaterialType.Emissive_Bloom);
    console.log("mt",mt);
    // model.set_material([113,114,115,116,117,118,119,120,71,130,131,132],mt,MaterialScope.element);
    model.set_material([212,211,105],mt,MaterialScope.element);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_material">设置</button>       
    </div>
</template>
