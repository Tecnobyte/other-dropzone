<template>
    <div style="text-align:center">Vue 3 Upload Files</div>
    <Dropzone v-model:file="archivos" _accept="image/*"></Dropzone>
</template>

<script>
import {Dropzone} from "./../src/index"
export default {
    name: "index",
    components: {
        Dropzone
    },
    data: ()=>{
        return {
            archivos: []
        }
    },
    methods: {
        uploadFiles(){
            console.log(this.archivos)
        }
    }
}
</script>

<style>

</style>