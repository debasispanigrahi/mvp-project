<template>
    <section class="w-full">
        <div class="h-24 flex items-end mx-4 my-2 text-2xl">
            <h2>Notifications</h2>
        </div>
        <div class="border-slate-300 border-solid border-0 border-t-2">
            <template v-if="notifyResult">
                <template v-if="notifyResult.length">
                    <Accordion v-for="(item) in notifyResult">
                        <AccordionTab>
                            <template #header>
                                <span class="flex align-items-center gap-2 w-full">
                                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                                        shape="circle" />
                                    <span class="font-bold white-space-nowrap">{{ item.title }}</span>
                                    <Badge value="3" class="ml-auto mr-2" />
                                </span>
                            </template>
                            <audio :src="item.audioSrc" id="audioPlay" controls class="border border-solid"></audio>
                            <p class="m-0">
                                {{ item.content }}
                            </p>
                        </AccordionTab>
                    </Accordion>
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

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import { onMounted, ref } from 'vue';
import { notificationsApi } from '../../../../api/notification';
import { Icon } from '@iconify/vue';

const notifyResult = ref<NoticeModel[] | null>(null)
onMounted(async () => {
    const alertResult = await notificationsApi.getAll()
    notifyResult.value = alertResult.data.notifications;
})

</script>