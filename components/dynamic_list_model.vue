<template>
  <div>
    <div class="px-6 py-4" v-if="props.options?.add">
      <div class="flex flex-wrap items-center justify-between gap-6">
        <h2 class="text-xl font-medium text-default-900">
          Add {{ props.options.add.title }}
        </h2>
        <button
          class="inline-flex rounded-md bg-orange-400 px-6 py-2.5 text-sm text-white hover:bg-orange-500"
          @click="addField"
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
        </button>
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

    <!-- <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :search="search"> </vue3-datatable> -->
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
      <template #isActive="data">
        <div class="flex gap-2">
          <AkPencil
            class="h-4 w-4 text-primary cursor-pointer"
            @click="editField(data.value)"
          />
          <AkTrashCan
            class="h-4 w-4 text-red-700 cursor-pointer"
            @click="deleteField(data.value.id)"
          />
        </div>
      </template>
    </vue3-datatable>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, createApp } from "vue";
import { AkEyeOpen, AkPencil, AkTrashCan ,AnFilledCloseSquare } from "@kalimahapps/vue-icons";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";
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
  fields: {
    type: Array,
    required: true,
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
    const signal = controller.signal;

    loading.value = true;

    const response = await fetch(props.options.url, {
      method: "POST",
      body: JSON.stringify(params),
      signal: signal, // Assign the signal to the fetch request
    });

    const data = await response.json();
    rows.value = data?.data;
    total_rows.value = data?.meta?.total;
  } catch {}

  loading.value = false;
};
const changeServer = (data) => {
  params.current_page = data.current_page;
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
import DynamicForm from "@/components/dynamic_components/form.vue"; // Your DynamicForm component

// Define form model
// const formModel = ref({
//   thing: null, // Initially null; will be set in child component
// });

// Define form model
const model = ref({});
const custom_class = ref(1);

const addField = () => {
  model.value = {};
  // Create a placeholder div where the Vue component will be mounted
  Swal.fire({
    title: "Fill out the form",
    html: '<div id="dynamic-form" class="swal-custom-class"></div>',
    showConfirmButton: false,
    didOpen: () => {
      // Dynamically mount the Vue component inside the SweetAlert2 modal
      const app = createApp(DynamicForm, {
        fields: props.fields,
        model: model.value,
        custom_class: custom_class.value,
        onSubmit: handleSubmit, // Handling the form submission
      });
      app.mount("#dynamic-form");
    },
  });
};
const editField = (data) => {
  model.value = data;
  // Create a placeholder div where the Vue component will be mounted
  Swal.fire({
    title: "Fill out the form",
    html: '<div id="dynamic-form" class="swal-custom-class"></div>',
    showConfirmButton: false,
    didOpen: () => {
      // Dynamically mount the Vue component inside the SweetAlert2 modal
      const app = createApp(DynamicForm, {
        fields: props.fields,
        model: model.value,
        custom_class: custom_class.value,
        onSubmit: handleSubmit, // Handling the form submission
      });
      app.mount("#dynamic-form");
    },
  });
};
const handleSubmit = (submittedData) => {
  console.log("Form submitted with:", submittedData);
  //Swal.close(); // Close SweetAlert after form submission
};
</script>
<style>
/* Override SweetAlert2's text-center style */
.swal-custom-class {
  text-align: left !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
