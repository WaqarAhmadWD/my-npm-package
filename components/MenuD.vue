<template>
  <div class="h-full w-full">

    <div style="height: auto; overflow: hidden">
      <div style="padding: 0px">
        <ul class="flex w-full flex-col gap-1.5 p-4">
          <li class="" v-for="(list, index) in props?.fields || []">
            <div v-if="!list.children">
              <RouterLink
                class="flex w-full items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                :to="list.url" active-class="active-link" @click="() => {
                  props.fields.forEach((item) => {
                    item.isSelected = false;
                  });
                }">
                <div v-if="list?.icon" v-html="list?.icon" class="icon-class"></div>
                {{ list.title }}
              </RouterLink>
            </div>
            <div v-if="list.children">
              <button
                class=" flex w-full cursor-pointer items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                @click="() => {
                  props.fields.forEach((item, innerIndex) => {
                    if (innerIndex == index) {
                      item.isSelected = !list.isSelected;
                    } else {
                      item.isSelected = false;
                    }
                  });
                }" :class="{ 'bg-gray-100': list.isSelected }">
                <div v-if="list?.icon" v-html="list?.icon" class="icon-class"
                  :style="{ height: '20px', width: '20px' }"></div>
                {{ list.title }}
                <svg stroke="currentColor" class="ms-auto transition-all duration-500"
                  :class="{ 'rotate-180': list.isSelected }" fill="none" stroke-width="2" viewBox="0 0 24 24"
                  stroke-linecap="round" stroke-linejoin="round" height="16" width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <div class="w-full overflow-hidden">
                <ul class="transition-all duration-500 mt-0 space-y-0" :class="{ 'mt-2 space-y-2': list.isSelected }">
                  <li class="transition-[height] duration-500 h-0" v-for="child in list.children"
                    :class="{ 'h-10': list.isSelected }">
                    <RouterLink
                      class="flex items-center cursor-pointer gap-x-3.5 py-2 px-2.5 text-sm font-medium text-default-700 rounded-md hover:bg-primary-50 group-[.active]:text-primary group-[.active]:bg-primary/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      :to="child.url" active-class="active-link">
                      <svg fill="#000000" width="5px" height="5px" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
                      </svg>
                      {{ child.title }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import { RouterLink } from "vue-router";
// props for the component
const props = defineProps({
  fields: {
    type: Array,
    required: false,
  },
  model: {
    type: Object,
    required: false,
  },
  custom_class: {
    type: Object,
    required: false,
  },
});
</script>

<style>
.active-link {
  color: #3490dc;
  /* Example active color */
  font-weight: bold;
}
</style>