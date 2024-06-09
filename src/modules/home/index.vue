<template>
    <div class="flex">
        <Sidebar/>
        <ListAlert ref="listAlert"/>
        <FormContainer @submitForm="listAlert?.fetchNotification()"/>
        <Toast />
    </div>
</template>
<script lang="ts" setup>
import Toast from 'primevue/toast';
import ListAlert from './components/Content/listAlert.vue';
import FormContainer from './components/modal/container.vue'
import Sidebar from '../../components/sidebar.vue'
import {ref } from 'vue';

const listAlert=ref<InstanceType<typeof ListAlert> | null>(null)

</script>

