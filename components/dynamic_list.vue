<template>
  <div>
    <div class="px-6 py-4" v-if="props.options.add">
      <div class="flex flex-wrap items-center justify-between gap-6">
        <h2 class="text-xl font-medium text-default-900">
          Add {{ props.options.add.title }}
        </h2>
        <RouterLink :to="props.options.add.url" class=""
          ><button
            class="inline-flex rounded-md bg-orange-400 px-6 py-2.5 text-sm text-white hover:bg-orange-500"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="me-2 inline-flex align-middle"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path></svg
            >Add New {{ props.options.add.title }}
          </button></RouterLink
        >
      </div>
    </div>

    <div class="mb-5">
      <input
        v-model="params.search"
        type="text"
        class="rounded-lg border outline-none px-4 py-2.5 dark:bg-default-50 max-w-sm"
        placeholder="Search..."
      />
    </div>

    <vue3-datatable
      :rows="rows"
      :columns="cols"
      :loading="loading"
      :totalRows="total_rows"
      :isServerMode="true"
      :pageSize="params.pagesize"
      :search="params.search"
      @change="changeServer"
    >
      <template #image="data">
        <div class="flex justify-center items-center">
          <img :src="data.value.image" alt="1" class="w-12 h-12 rounded-full" />
        </div>
      </template>
      <template #isActive="data">
        <div class="flex gap-2">
          <RouterLink
            :to="{ name: options.router.edit, params: { id: data.value.id } }"
            v-if="options.router.edit"
          >
            <AkPencil class="h-4 w-4 text-primary cursor-pointer" />
          </RouterLink>
          <RouterLink
            :to="{ name: options.router.view, params: { id: data.value.id } }"
            v-if="options.router.view"
          >
            <AkEyeOpen class="h-4 w-4 text-blue-500 cursor-pointer" />
          </RouterLink>
          <AkTrashCan
            class="h-4 w-4 text-red-700 cursor-pointer"
            @click="deleteField(data.value.id)"
            v-if="options.router.edit"
          />
        </div>
      </template>
    </vue3-datatable>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { AkEyeOpen, AkPencil, AkTrashCan } from "@kalimahapps/vue-icons";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import { RouterLink } from "vue-router";

const loading = ref(true);
const total_rows = ref(0);

const params = reactive({
  current_page: 1,
  pagesize: 10,
  search: "",
  column_filters: [],
});
const rows = ref(null);

const props = defineProps({
  cols: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  custom_class: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  getUsers();
});

let controller;
let timer;
const filterUsers = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    getUsers();
  }, 300);
};

const getUsers = async () => {
  try {
    // cancel request if previous request still pending before next request fire
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    // Define the fetch options
    const fetchOptions = {
      method: props.options.method,
      signal: controller.signal, // For abort functionality
    };

    // Conditionally add the body for POST requests
    if (props.options.method.toUpperCase() === "POST") {
      fetchOptions.body = JSON.stringify(params);
    }

    // Fetch request
    const response = await fetch(props.options.url, fetchOptions);
    const data = await response.json();
    console.log(data);

    loading.value = true;

    // Handle response data
    if (data?.data) {
      rows.value = data?.data;
      total_rows.value = data?.meta?.total;
    } else {
      rows.value = data;
      total_rows.value = data?.length;
    }
  } catch (error) {
    console.error(error); // You might want to log the error in case of failure
  }

  loading.value = false;
};

const changeServer = (data) => {
  params.current_page = data.current_page ? data.current_page : 1;
  params.pagesize = data.pagesize;
  params.column_filters = data.column_filters;
  params.search = data.search;

  if (data.change_type === "search") {
    filterUsers();
  } else {
    getUsers();
  }
};
const deleteField = async (id) => {
  try {
    // cancel request if previous request still pending before next request fire
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;

    loading.value = true;

    const response = await fetch(props.options.url + "/" + id, {
      method: "DELETE",
      signal: signal, // Assign the signal to the fetch request
    });

    const data = await response.json();
    rows.value = data?.data;
    total_rows.value = data?.meta?.total;
  } catch {}

  loading.value = false;
};
</script>
