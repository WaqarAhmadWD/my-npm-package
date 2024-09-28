<template>
        <div class="flex w-full items-center justify-between z-30">
            <h4 class="text-xl font-medium">{{ title }}</h4>
            <ul class="hidden min-w-0 items-center gap-2 whitespace-nowrap md:flex">
                <li class="text-sm">
                <div class="flex items-center gap-2 align-middle text-default-800 transition-all hover:text-primary-500 cursor-pointer">
                    {{ subtitle }}
                    <LuChevronRight size="16" />
                </div>
                </li>
                <li class="truncate text-sm font-medium text-primary hover:text-primary-500">
                {{ title }}
                </li>
            </ul>
        </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { RouterLink } from 'vue-router';
  import { LuChevronRight } from '@kalimahapps/vue-icons';
  
  // Define props for the component
  const props = defineProps({
    title: String,
    subtitle: String
  });
  </script>
  
  <style scoped>

  </style>