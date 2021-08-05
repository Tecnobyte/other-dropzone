<template>
    <div style="text-align:center">Vue 3 Upload Files</div>
    <FileField v-model:file="archivos" _accept="image/*"></FileField>
</template>

<script>
import {FileField} from "./../src/index"
export default {
    name: "index",
    components: {
        FileField
    },
    data: ()=>{
        return {
            archivos: []
        }
    },
    // watch:{
    //     archivos(val, old){
    //         console.log("vigilante del aula"),
    //         console.log(val);
    //     }
    // },
    methods: {
        uploadFiles(){
            console.log(this.archivos)
        }
    }
}
</script>

<style>

</style>