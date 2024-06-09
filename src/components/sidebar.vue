<template>
    <aside class="w-[300px] sidebar-section min-[768px]:h-screen pr-2 max-[768px]:fixed max-[768px]:top-1/2 max-[768px]:z-30 max-[768px]:bg-white max-[768px]:-translate-y-1/2 max-[768px]:border-solid max-[768px]:border-gray-500 max-[768px]:rounded-r-md max-[768px]:py-2">
        <div>
            <div class="user-name flex items-center my-4 text-[#009063] font-bold">
                <Avatar label="J" class="mr-2" size="xlarge" style="background-color: #f1fdf5;"/>
                <span>
                    Welcome John !
                </span>
            </div>
            <div class="links">
                <ul class="flex flex-col gap-4 max-[768px]:gap-2">
                    <li v-for="link in allLinks" :key="link.route" class="py-4 px-2 max-[768px]:py-2 text-base bg-[#f1fdf5] rounded-r-full">
                        <a :href="link.route" :class="{ 'link-active': link.active }" class="router-link">
                            {{ link.name }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Avatar from 'primevue/avatar';

const allLinks = ref([
    {
        name: 'Health Score',
        route: 'health-score',
        active: false
    },
    {
        name: 'Notify User',
        route: 'notify-user',
        active: true
    },
    {
        name: 'Prescription',
        route: 'prescription',
        active: false
    },
    {
        name: 'Device List',
        route: 'device-list',
        active: false
    },
    {
        name: 'Connect Device',
        route: 'connect-device',
        active: false
    },
    {
        name: 'Buy Device',
        route: 'buy-new-device',
        active: false
    },
    {
        name: 'Settings',
        route: 'settings',
        active: false
    }

])

</script>
<style scoped>
.router-link{
    color:#3B3B3B;
    text-decoration: none;
    transition: all 0.2s linear;
}
.router-link:hover{
   margin-left: 5px;
   text-decoration: underline;
   text-underline-offset: 2px;
}
.router-link.link-active{
    margin-left: 10px;
    font-weight: 500;
    text-decoration: underline;
   text-underline-offset: 2px;
}
</style>