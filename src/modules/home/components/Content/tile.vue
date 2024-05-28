<template>
    <Accordion>
        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 w-full max-[768px]:text-sm">
                    <Avatar class="mr-2" size="large" style="background-color: #f1fdf5;" shape="circle">
                        <template #icon>
                            <Icon icon="mdi:user" height="32" width="32" class="play" style="color: #2a1261;"></Icon>
                        </template>
                    </Avatar>
                    <span class="font-medium white-space-nowrap notify-header">{{ notifyResult.title }}</span>
                    <span
                        class="ml-auto text-base no-underline mr-2 !hover:no-underline text-[#3B3B3B] max-[768px]:text-sm"
                        :key="time.getTime()">{{
                            getTimeRemaining(notifyResult.time) }}</span>
                </span>
            </template>
            <div v-if="notifyResult.audioSrc">
                <audio ref="audio" :src="notifyResult.audioSrc" id="audioPlay" preload="metadata"
                    class="border border-solid"></audio>
                <div @click="playAudio" class="flex gap-2 items-center">
                    <span>Play Recorded Audio ? </span>
                    <Icon icon="mdi:play" height="32" width="32" class="play"></Icon>
                    <Icon icon="material-symbols:stop" height="32" width="32" class="stop"></Icon>
                </div>
            </div>
            <p class="m-0 max-[768px]:text-sm" v-else>
                {{ notifyResult.content }}
            </p>
            <template v-if="Math.max(new Date(notifyResult.time).getTime() - time.getTime(), 0)">
                <Message severity="success" :closable="false" class="py-2 mt-3 px-2 max-[768px]:text-sm">
                    <div class="ml-2">
                        Notification time is
                        {{ new Date(notifyResult.time).toLocaleString('en-GB') }}
                    </div>
                </Message>
                <span @click="removeNotification"
                    class="inline-block my-3 text-[#ef4444] bg-[#ef444434] px-8 py-2 rounded-md cursor-pointer">Remove
                    this Notification</span>
            </template>
            <Message v-else severity="warn" :closable="false" class="py-2 mt-3 px-2 max-[768px]:text-base">
                <div class="ml-2">
                    Expired, Notification time was {{ new
                        Date(notifyResult.time).toLocaleString('en-GB') }}
                </div>

            </Message>
        </AccordionTab>
    </Accordion>

</template>

<script setup lang="ts">
import AccordionTab from 'primevue/accordiontab';
import Message from 'primevue/message'
import Avatar from 'primevue/avatar';
import Accordion from 'primevue/accordion';
import { Icon } from '@iconify/vue';
import { getTimeRemaining } from '../../../../utils/time'
import { onMounted, ref } from 'vue';
import { notificationsApi } from '../../../../api/notification';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const emit = defineEmits(['removeItem'])
const props = defineProps<{
    notifyResult: NoticeModel
}>()


const removeNotification = async () => {
    await notificationsApi.deleteOne(props.notifyResult._id + '')
    toast.add({ severity: 'success', summary: 'Success', detail: 'Notification deleted successfully', life: 3000 });
    emit("removeItem", props.notifyResult._id)
}
const time = ref(new Date())
onMounted(() => {
    if (Math.max(new Date(props.notifyResult.time).getTime() - new Date().getTime(), 0)) {
        setInterval(() => time.value = new Date(), 1000)
    }
})
const playAudio = (e: Event) => {
    let el = ((e.currentTarget as HTMLDivElement).previousSibling as HTMLAudioElement)
    if (el.duration > 0 && !el.paused) {
        el.pause()
        el.currentTime = 0

    } else {
        el.play();
        (e.currentTarget as HTMLDivElement).classList.add('playing');
        el.onended = (e) => {
            ((e.currentTarget as HTMLAudioElement).nextSibling as HTMLDivElement).classList.remove('playing');
        }
    }
}
</script>