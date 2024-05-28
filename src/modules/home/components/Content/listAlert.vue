<template>
    <section class="w-full">
        <div class="flex mx-4 my-2 text-lg max-[768px]:text-lg  mt-8 flex-col gap-4">
            <div class="flex flex-col gap-2 text-xl max-[768px]:text-lg">
                <Tag value="Today's Advice" class="w-fit px-4 py-2"></Tag>
                <span>
                    Sugary drinks like sodas, fruit juices, and sweetened teas are the primary source of added sugar in
                    the American diet.
                </span>
            </div>
            <hr class="opacity-40" />

            <h2 class="italic text-[--text-header] uppercase max-[768px]:text-lg">Notifications</h2>
        </div>
        <div class="mt-4">
            <template v-if="notifyResults">
                <template v-if="notifyResults.length">
                    <Tile :notify-result="item" v-for="(item) in notifyResults" @remove-item="removeItem($event)" />
                </template>
                <template v-else>
                    <div class="flex  justify-center items-center gap-4 mt-8">
                        <span class="text-xl">No Notification Found !!! Please add nottifications </span>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="flex  justify-center items-center gap-4 mt-8">
                    <span class="text-xl">Fetching Notifications !!! </span>
                    <Icon icon="mdi:loading" class="animate-spin" width="48" height="48" style="color: white"></Icon>
                </div>
            </template>
        </div>
    </section>
</template>

<script lang="ts" setup>
import Tile from './tile.vue'
import { onMounted, ref } from 'vue';
import Tag from 'primevue/tag';
import { notificationsApi } from '../../../../api/notification';
import { Icon } from '@iconify/vue';

const notifyResults = ref<NoticeModel[] | null>(null)
const fetchNotification = async () => {
    const alertResult = await notificationsApi.getAll()
    notifyResults.value = alertResult.data.notifications;
}
onMounted(async () => {
    fetchNotification()
})
const removeItem = (e: string) => {
    notifyResults.value = notifyResults.value?.filter((v) => v._id != e) || []
}

defineExpose({
    fetchNotification
})

</script>