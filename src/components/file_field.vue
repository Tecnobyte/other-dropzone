<template>
    <div class="box">
        <div class="container" id="box" @click="handleFile" @dragover.prevent="onDragover" @dragenter.prevent @drop.prevent="onDrop($event);$emit('update:file', files)">
            <input type="file" id="f" multiple class="input" :accept="_accept" @change="file" @input="$emit('update:file', files)" hidden>

            <template v-if="files.length > 0">
                <div class="items">
                    <div class="item" v-for="(item, i) of files" :key="i">
                        <div>
                            <span style="text-overflow: ellipsis;">{{item.name}}</span>
                            <span style="text-overflow: ellipsis;">{{convertByte(item.size)}}</span>
                        </div>
                        <div>
                            <button @click="deleteFile($event, i)">eliminar</button>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div style="margin-top: 2rem">
                    <div style="text-align:center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-cloud-upload" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                            <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                    </div>
                    <div style="text-align:center">
                        Subir archivos
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {ref, onMounted} from "vue";
    export default {
        props: {
            _accept: {
                type: String,
                default: "image/*",
            }
        },
        setup( props, {emit} ){
            const per = ref(0);
            const files = ref([]);

            const handleFile = (event)=>{
                document.getElementById("f").click()
            } 
            const file = (event)=>{
                if(event.target.files.length > 0){
                    
                    for(let item of event.target.files){
                        let read = new FileReader();
                        read.onload = (e)=>{
                            // console.log(e.target.result);
                            files.value.push({
                                name: item.name,
                                type: item.type,
                                size: item.size,
                                origin: item,
                                decode: e.target.result
                            });    
                        }
                        read.onprogress = (e)=>{
                            per.value = parseInt( (e.loaded*100)/e.total );
                            // console.log(`${per.value}%`);
                        }
                        read.readAsDataURL(item)
                    }
                    
                }
            }
            const deleteFile = (event, index)=>{
                // event.preventDefault();
                event.stopPropagation();
                files.value.splice(index, 1);
                emit("update:file", files.value);
            }
            const eraseAll = ()=>{
                files.value = [];
                emit("update:file", files.value);
            }
            const onDragover = (event)=>{
                let drop = document.getElementById("box");
                drop.classList.add('container-drop')
            }
            const onDrop = (event)=>{
                let drop = document.getElementById("box");
                if(event.dataTransfer.files.length > 0){
                    for(let item of event.dataTransfer.files){
                        let read = new FileReader();
                        read.onload = (e)=>{
                            files.value.push({
                                name: item.name,
                                type: item.type,
                                size: item.size,
                                origin: item,
                                decode: e.target.result
                            });    
                        }
                        read.onprogress = (e)=>{
                            per.value = parseInt( (e.loaded*100)/e.total );
                            // console.log(`${per.value}%`);
                        }
                        read.readAsDataURL(item)
                    }
                    drop.classList.remove('container-drop')
                }
            }

            return {
                // var
                per,
                files,
                
                // function
                onDragover, 
                onDrop,
                handleFile,
                file,
                deleteFile,
                eraseAll,

            }
        },
        methods: {
            convertByte(byte){
                // 8 = byte
                // 1024 = kb
                // 1024kb = 1mega
                // 16 586 900 -> megas
                if(byte > (1000*10)){ // 1000 es igual a un kb
                    let total = parseFloat(byte / 1024*10);
                    return `${total} kb`
                }else if( byte > (1000* 100) ){ // 1000 ^10 = 1 mega
                    let total = parseFloat(byte / (1024 * 100));
                    return `${total} mb`
                }else if( byte > (1000*1000) ){ // 1000 ^ = 1 gb
                    let total = parseFloat(byte / (1024 * 1000));
                    return `${total} gb`
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 10rem;
        border: 3px solid rgba(72, 71, 71, 0.996);
        /* border: 3px solid rgba(117, 117, 117, 0.797); */
        border-style: dashed !important;
        cursor: pointer;
        /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
    }
    .container-drop{
        border: 3px solid rgba(117, 117, 117, 0.797) !important;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) !important;
        border-style: dashed !important;
    }
    
    .box{
        display: flex;
        flex-direction: column;
        padding: 2%;
    }
    .items{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0% 0% 1% 0%;
    }
    .item{
        width: 30%;
        float: left;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

</style>