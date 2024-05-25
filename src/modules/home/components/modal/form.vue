<template>
    <form class="w-full p-4" @submit.prevent="submitMessage()">
        <div class="flex flex-wrap mb-4">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-1"
                    for="grid-first-name">
                    Title
                </label>
                <InputText
                    class="appearance-none block w-full  text-gray-700 border rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" v-model="form.title" type="text" placeholder="Title of notification" />
                <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
            </div>
        </div>
        <div class="flex flex-wrap mb-4">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-1" for="grid-password">
                    Content
                </label>
                <div class="flex items-center">
                    <Textarea
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :disabled="contentLoading == 'audio'" id="grid-password" placeholder="Notification content"
                        v-model="form.content"></Textarea>
                    <div>
                        <Icon icon="material-symbols-light:mic" @click="startRecording"
                            class="rounded-full p-2 border border-solid ml-6 cursor-pointer"
                            :class="{ 'animate-ping': contentLoading === 'audio' }" :width="48" :height="48"></Icon>
                    </div>
                </div>

                <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
        </div>
        <div class="flex flex-wrap mb-4">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-1" for="grid-city">
                    Time
                </label>
                <Calendar showTime hourFormat="12" id="grid-city" type="text" showSeconds inputClass="py-2 px-3"
                    v-model="form.time" :placeholder="new Date().toLocaleString()" />
            </div>
        </div>
        <audio id="audioPlay" controls class="border border-solid"></audio>
        <div class="px-3 py-3">
            <Button type="submit" label="Search" icon="pi pi-search" class="py-2 px-3" :loading="false"
                @click="() => { }" />
        </div>
    </form>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { ref } from 'vue'
import { notificationsApi } from '../../../../api/notification';
import { Icon } from '@iconify/vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const form = ref<Notice>({
    content: '',
    time: new Date(),
    title: '',
    audio: null
})

const contentLoading = ref<"text" | "audio">("text")

const submitMessage = async () => {

    const formData = new FormData();

    for (let key in form.value) {
        formData.append(key, (form.value as any)[key]);
    }
    await notificationsApi.createOne(formData)
    await notificationsApi.getAll()
}
const checkForAudioAccess = async () => {
    return await navigator.mediaDevices.getUserMedia({ audio: true }).catch(_ => false)
}
const startRecording = async () => {
    contentLoading.value = 'audio'
    const audioAccess = await checkForAudioAccess();
    if (!audioAccess) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Microphone Access not granted', life: 3000 });
        contentLoading.value = 'text'
        return
    }
    let mediaRecorder = new MediaRecorder(audioAccess as MediaStream);
    let dataArray: BlobPart[] = []
    mediaRecorder.start()
    mediaRecorder.ondataavailable = function (ev) {
        dataArray.push(ev.data);
    }
    setTimeout(() => {
        mediaRecorder.stop()
        contentLoading.value = 'text'
    }, 3000)
    // Convert the audio data in to blob 
    // after stopping the recording

    let playAudio = document.querySelector('audio');
    mediaRecorder.onstop = function () {

        // blob of type mp3
        let audioData = new Blob(dataArray,
            { 'type': 'audio/mp3;' });

        // After fill up the chunk 
        // array make it empty
        dataArray = [];
        form.value.audio = audioData

        // Creating audio url with reference 
        // of created blob named 'audioData'
        let audioSrc = window.URL
            .createObjectURL(audioData);

        // Pass the audio url to the 2nd video tag
        if(playAudio)playAudio.src = audioSrc;
    }
}
</script>