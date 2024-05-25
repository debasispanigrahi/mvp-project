<template>
    <div class="flex">
        <aside class="w-[300px] h-screen border-slate-300 border-solid border-0 border-r-2">
            sidebar content
        </aside>
        <ListAlert/>
        <FormContainer/>
        <Toast />
    </div>
</template>
<script lang="ts" setup>
import Toast from 'primevue/toast';
import ListAlert from './components/Content/listAlert.vue';
import FormContainer from './components/modal/container.vue'

</script>

