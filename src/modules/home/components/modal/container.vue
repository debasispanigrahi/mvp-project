<template>
    <div class="widget">
        <Button v-tooltip.left="{
            value: 'Add Notification',
            pt: {
                text: 'p-2 mr-1'
            }
        }" class="fixed bottom-12 max-[768px]:bottom-4 max-[768px]:right-4 right-12 cursor-pointer rounded-full border-white border-solid p-2 z-50">
            <Icon v-tooltip.top="'Add new notification'" @click="visible = true" icon="mdi:bell" height="32" width="32"
                style="color: var(--text-header);"></Icon>
        </Button>

        <Dialog v-model:visible="visible" modal header="Add New Notification" :style="{ width: '40rem' }">
            <Form @submitForm="hideModal"/>
        </Dialog>

    </div>
</template>

<script setup lang="ts">
import Form from './form.vue'
import Dialog from 'primevue/dialog';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import Button from 'primevue/button';
const visible = ref(false)
const emit=defineEmits(['submitForm'])
const hideModal=()=>{
    emit('submitForm')
    visible.value=false;
}
</script>