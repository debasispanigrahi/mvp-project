<template>
    <form class="w-full p-4 max-[768px]:pt-1" :class="{ 'showError': showError }" @submit.prevent="submitMessage()">
        <div class="flex flex-wrap mb-4 max-[768px]:mb-2">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base max-[768px]:text-sm font-bold mb-1"
                    for="grid-first-name">
                    Title
                </label>
                <InputText
                    class="appearance-none block w-full  text-gray-700 border rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" v-model="form.title" type="text" placeholder="Title of notification" />
                <p class="text-red-500 text-xs italic error-log">{{ titleError }}</p>
            </div>
        </div>
        <div class="flex flex-wrap mb-4 max-[768px]:mb-2">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base max-[768px]:text-sm font-bold mb-1" for="grid-password">
                    Content
                </label>
                <div class="flex items-center">
                    <Textarea
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :disabled="contentLoading == 'audio' || !!form.audio" id="grid-password"
                        placeholder="Notification content" v-model="form.content"></Textarea>
                    <div>
                        <Icon icon="material-symbols-light:mic" @click="startRecording"
                            class="rounded-full p-2 border border-solid ml-6 cursor-pointer"
                            :class="{ 'animate-ping': contentLoading === 'audio', 'opacity-50 pointer-events-none': form.content }"
                            :width="48" :height="48"></Icon>
                    </div>
                </div>
                <p class="text-gray-600 text-xs italic">Make it as long as you'd like</p>
                <p class="text-red-500 text-xs italic error-log">{{ contentError }}</p>
                <div v-if="!form.content && !!form.audio">
                    <div @click="playAudio" v-if="audioStatus == 'stop'" class="flex gap-2 items-center">
                        <span>Play Recorded Audio ? </span>
                        <Icon icon="mdi:play" height="32" width="32"></Icon>
                    </div>
                    <div @click="stopAudio" v-else class="flex gap-2 items-center">
                        <span>Play Recorded Audio?</span>
                        <Icon icon="material-symbols:stop" height="32" width="32"></Icon>
                    </div>
                    <audio id="formAudioPlay" @ended="stopAudio"></audio>
                </div>

            </div>
        </div>
        <div class="flex flex-wrap mb-4 max-[768px]:gap-4 max-[768px]:mb-2">
            <div class="w-1/2 max-[768px]:w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base max-[768px]:text-sm font-bold mb-1" for="grid-city">
                    Time
                </label>
                <Calendar showTime hourFormat="12" id="grid-city" type="text" showSeconds
                    inputClass="py-2 px-3 h-[45px]" v-model="form.time" :placeholder="new Date().toLocaleString()" />
            </div>
            <div class="w-1/2 max-[768px]:w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-base max-[768px]:text-sm font-bold mb-1" for="grid-city">
                    Device ID
                </label>
                <InputText
                    class="appearance-none block w-full  text-gray-700 border rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" v-model="form.deviceId" type="text" placeholder="Device Id of User"
                    @input="() => (form.deviceId = form.deviceId.toUpperCase())"></InputText>
                <p class="text-red-500 text-xs italic error-log">{{ deviceError }}</p>
            </div>
        </div>

        <div class="px-3 py-3 max-[768px]:py-0">
            <Button type="submit" label="Add Notification &nbsp;" icon="pi pi-search" class="py-2 px-3"
                :loading="submitStatus" iconPos="right" />
        </div>
    </form>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { computed, nextTick, ref } from 'vue'
import { notificationsApi } from '../../../../api/notification';
import { Icon } from '@iconify/vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const emit = defineEmits(['submitForm'])

const requiredError = "{Label} is required"
const maxLengthError = "{Label} must be less then {Max} characters"
const minLengthError = "{Label} must have {Min} characters"
const form = ref<Notice>({
    content: "",
    time: new Date(),
    title: "",
    audio: null,
    deviceId: ""
})
const showError = ref(false)


const titleError = computed(() => {
    if (!form.value.title) return requiredError.replace('{Label}', 'Title')
    if (form.value.title.length > 50) return maxLengthError.replace('{Label}', 'Title').replace('{Max}', '50');
    if (form.value.title.length < 5) return minLengthError.replace('{Label}', 'Title').replace('{Min}', '5');
    return ""
})

const contentError = computed(() => {
    if (form.value.audio) return ""
    if (!form.value.content && !form.value.audio) return requiredError.replace('{Label}', 'Content or Audio')
    if (form.value.content.length > 500) return maxLengthError.replace('{Label}', 'Content').replace('{Max}', '500');
    if (form.value.content.length < 10) return minLengthError.replace('{Label}', 'Content').replace('{Min}', '10');
    return ""
})

const deviceError = computed(() => {
    if (!form.value.deviceId) return requiredError.replace('{Label}', 'Device')
    if (form.value.deviceId.length > 10) return maxLengthError.replace('{Label}', 'Device').replace('{Max}', '10');
    if (form.value.deviceId.length < 8) return minLengthError.replace('{Label}', 'Device').replace('{Min}', '8');
    return ""
})

const contentLoading = ref<"text" | "audio">("text");
const audioStatus = ref<'play' | 'stop'>('stop')
const submitStatus = ref(false)

const submitMessage = async () => {
    showError.value = true
    if (titleError.value || contentError.value || deviceError.value) {
        return toast.add({ severity: 'error', summary: 'Error', detail: 'Fields have Error', life: 3000 });
    }
    submitStatus.value = true
    const formData = new FormData();
    for (let key in form.value) {
        formData.append(key, (form.value as any)[key]);
    }
    await notificationsApi.createOne(formData)
    submitStatus.value = false
    toast.add({ severity: 'success', summary: 'Success', detail: 'Notification added successfully', life: 3000 });
    emit('submitForm')
}


const getAudioElement = (): HTMLAudioElement => {
    return document.querySelector('#formAudioPlay')!
}
const playAudio = () => { getAudioElement().play(); audioStatus.value = 'play' }
const stopAudio = () => { getAudioElement().pause(); getAudioElement().currentTime = 0; audioStatus.value = 'stop' }

const checkForAudioAccess = async () => {
    return await navigator.mediaDevices.getUserMedia({ audio: true }).catch(_ => false)
}
const mediaRecorder = ref<MediaRecorder | null>(null)
const startRecording = async () => {
    if (contentLoading.value === 'audio') return mediaRecorder.value?.stop()
    const audioAccess = await checkForAudioAccess();
    if (!audioAccess) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Microphone Access not granted', life: 3000 });
        contentLoading.value = 'text'
        return
    }
    mediaRecorder.value = new MediaRecorder(audioAccess as MediaStream);
    contentLoading.value = 'audio'
    let dataArray: BlobPart[] = []
    mediaRecorder.value.start()
    mediaRecorder.value.ondataavailable = function (ev) {
        dataArray.push(ev.data);
    }
    setTimeout(() => { mediaRecorder.value?.stop() }, 30000)

    mediaRecorder.value.onstop = function () {
        let audioData = new Blob(dataArray, { 'type': 'audio/mp3;' });
        dataArray = [];
        form.value.audio = audioData
        let audioSrc = window.URL.createObjectURL(audioData);
        nextTick(() => { getAudioElement().src = audioSrc })
        mediaRecorder.value = null
        contentLoading.value = 'text'
    }
}
</script>