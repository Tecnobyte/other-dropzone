# Other dropzone

another dropzone is a component made in vue3 that allows the handling of files in a simple way, if so much complication.

## installation
```sh
npm i other-dropzone
```

## use
```sh
    <Dropzone v-model:file="archivos" _accept="image/*"></Dropzone>
    
    import {Dropzone} from "other-dropzone"
    components: {
        Dropzone
    },
```

## props
- _accept: A string is sent with the type of file to accept, if you want to accept a type you have to separate it by a comma. example "image / *, pdf"
