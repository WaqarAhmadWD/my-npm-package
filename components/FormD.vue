<!-- Your existing template -->
<template>
  <Form
    v-if="schema"
    @submit="submitForm"
    class="rounded-lg border border-default-200 p-6"
    :class="{
      'w-1/2': custom_class === 0,
      'w-full': custom_class === 1,
    }"
    :validation-schema="schema"
  >
    <div
      :class="{
        'mb-6 grid gap-6 lg:grid-cols-2 w-full': custom_class === 0,
        'mb-6 grid gap-6 lg:grid-cols-2': custom_class === 1,
      }"
    >
      <div v-for="(field, index) in filter" :key="index" class="w-full">
        <label
          class="mb-2 block text-sm font-medium text-default-900"
          :for="field.name"
          >{{ field.label }}</label
        >

        <!-- Textarea Field -->
        <Field
          v-if="field.type === 'textarea'"
          :id="field.name"
          v-model="formModel[field.name]"
          as="textarea"
          :placeholder="field.placeholder"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
          :class="field.class"
          :name="field.name"
        />

        <!-- Regular Select Field -->
        <Field
          v-if="field.type === 'select' && field.type !== 'searchableSelect'"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
          v-model="formModel[field.name]"
          :placeholder="field.placeholder"
          as="select"
          :name="field.name"
        >
          <option
            v-for="option in field.options"
            :key="option.id"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </Field>

        <!-- Text or Email Field -->
        <Field
          v-if="
            field.type === 'text' ||
            field.type === 'email' ||
            field.type === 'time' ||
            field.type === 'date' ||
            field.type === 'number'
          "
          :id="field.name"
          v-model="formModel[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
          :class="field.class"
          :name="field.name"
        />

        <!-- Custom Checkbox -->
        <div v-if="field.type === 'checkbox'" class="flex flex-col gap-[1vw]">
          <div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="formModel[field.name]"
                :id="field.name"
                :name="field.name"
              />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300 peer-checked:after:translate-x-full peer-checked:bg-[#f48220] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:border-white"
              ></div>
            </label>
          </div>
        </div>

        <!-- Password Field with Show/Hide Toggle -->
        <div
          class="rounded-lg border border-default-200 outline-none dark:bg-default-50 px-4 py-1 w-full flex justify-between items-center"
          v-if="field.type === 'password'"
        >
          <Field
            :id="field.name"
            v-model="formModel[field.name]"
            :type="field.showPass ? 'text' : 'password'"
            :placeholder="field.placeholder"
            class="w-full h-full border-0 ring-0 outline-none focus:outline-none focus:ring-0"
            :class="field.class"
            :name="field.name"
          />
          <AkEyeSlashed
            class="cursor-pointer w-5 h-5"
            v-if="field.showPass"
            @click="togglePass(index)"
          />
          <AkEyeOpen
            class="cursor-pointer w-5 h-5"
            v-if="!field.showPass"
            @click="togglePass(index)"
          />
        </div>

        <!-- Error Message -->
        <ErrorMessage class="text-red-500" :name="field.name" />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="w-full flex justify-end">
      <button
        type="submit"
        class="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary"
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
          ></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Submit
      </button>
    </div>
  </Form>
</template>

<script setup>
import { toRefs, reactive, onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { AkEyeSlashed, AkEyeOpen } from "@kalimahapps/vue-icons";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  model: {
    type: Object,
    required: true,
  },
  custom_class: {
    type: String,
    required: false,
  },
});

const filter = ref();
const formModel = reactive({ ...props.model });
const schema = ref();

const togglePass = (index) => {
  const field = filter.value[index];
  if (field && field.type === "password") {
    field.showPass = !field.showPass;
  }
};

onMounted(async () => {
  filter.value = props.fields.map((field) => {
    if (field.type === "password") {
      field.showPass = field.showPass || false;
    }
    return field;
  });

  // Initialize the first option as default for select fields
  const selectField = props.fields.find((field) => field.type === "select");
  if (selectField && selectField.options.length > 0) {
    formModel[selectField.name] = selectField.options[0].name;
  }

  // Create validation schema using Yup
  schema.value = await yup.object(
    props.fields.reduce((result, field) => {
      let validationRule = yup.mixed();
      if (field.schema) {
        validationRule = eval(field.schema);
      } else if (field.type === "checkbox") {
        validationRule = yup
          .boolean()
          .oneOf([true], `${field.label} must be accepted`);
      }
      result[field.name] = validationRule;
      return result;
    }, {})
  );
});

const emit = defineEmits(["submit"]);
const submitForm = () => {
  emit("submit", formModel);
};
</script>

<style scoped></style>
