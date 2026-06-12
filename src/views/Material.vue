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
    }
});
onBeforeUnmount(()=>{
    app?.dispose();
});
const set_material =()=>{
    const mt = model.create_material("test",new Color([155,255,155,255]),0.9,0.1,MaterialType.General);    
    console.log("mt",mt);
    model.set_material([460],mt,MaterialScope.element);
}

</script>
<template>
    <div ref="dom" style="width: 100%;height: 100%;"></div>
    <div style="position:fixed; top: 100px; left: 250px;">
        <button @click="set_material">设置</button>       
    </div>
</template>
