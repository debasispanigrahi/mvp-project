<template>
    <form class="w-full max-w-lg" @submit.prevent="submitMessage()">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Title
                </label>
                <InputText
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" v-model="form.title" type="text" placeholder="Title of notification"/>
                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Content
                </label>
                <Textarea
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password" placeholder="Notification content" v-model="form.content"></Textarea>
                <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Time 
                </label>
                <Calendar
                    id="grid-city" type="text" :placeholder="new Date().toLocaleString()"/>
            </div>
        </div>
        <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
                <Button type="submit" label="Search" icon="pi pi-search" :loading="false" @click="()=>{}" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { ref } from 'vue'
import { notificationsApi } from '../../api/notification';

const form = ref<Form>({
    content: 'content',
    time: new Date(),
    title: 'hhthhth'
})

const submitMessage=async ()=>{
    await notificationsApi.createOne(form.value)
    await notificationsApi.getAll()
}
</script>