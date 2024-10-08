<!-- Your existing template -->
<template>
  <div
    :class="
      custom_class?.main
        ? custom_class?.main
        : 'mb-6 grid gap-6 lg:grid-cols-2 w-full'
    "
  >
    <div v-for="(field, index) in filter" :key="index" class="w-full">
      <label
        class="mb-2 block text-sm font-medium text-default-900 ml-2"
        :for="field.name"
        >{{ field.label }}</label
      >

      <!-- Textarea Field -->
      <input
        v-if="field.type === 'textarea'"
        :id="field.name"
        v-model="formModel[field.name]"
        as="textarea"
        :placeholder="field.placeholder"
        class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
        :class="field.class"
        :name="field.name"
        @input="onChange(index)"
      />

      <!-- Regular Select Field -->
      <select
        v-if="field.type === 'select' && field.type !== 'searchableSelect'"
        class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
        v-model="formModel[field.name]"
        :placeholder="field.placeholder"
        :name="field.name"
        :class="field.class"
        @change="onChange(index)"
      >
        <option
          v-for="option in field.options"
          :key="option.id"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>

      <!-- Text or Email Field -->
      <input
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
        @input="onChange(index)"
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
              :class="field.class"
              @input="onChange(index)"
            />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300 peer-checked:after:translate-x-full peer-checked:bg-[#f48220] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:border-white"
            ></div>
          </label>
        </div>
      </div>

      <!-- Password Field with Show/Hide Toggle -->
      <div
        class="rounded-lg border border-default-200 outline-none dark:bg-default-50 w-full flex justify-between items-center h-fit m-0 p-0"
        v-if="field.type === 'password'"
      >
        <input
          :id="field.name"
          v-model="formModel[field.name]"
          :type="field.showPass ? 'text' : 'password'"
          :placeholder="field.placeholder"
          class="w-full h-full border-0 ring-0 outline-none focus:outline-none focus:ring-0 px-4 py-3 rounded-lg"
          :class="field.class"
          :name="field.name"
          @input="onChange(index)"
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="cursor-pointer bg-transparent mx-2"
          v-if="field.showPass"
          @click="togglePass(index)"
        >
          <path
            d="M2 2L22 22"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="20"
          height="20"
          viewBox="0 0 256 256"
          xml:space="preserve"
          class="cursor-pointer mx-2"
          v-if="!field.showPass"
          @click="togglePass(index)"
        >
          <defs></defs>
          <g
            style="
              stroke: none;
              stroke-width: 0;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: none;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <path
              d="M 45 73.264 c -14.869 0 -29.775 -8.864 -44.307 -26.346 c -0.924 -1.112 -0.924 -2.724 0 -3.836 C 15.225 25.601 30.131 16.737 45 16.737 c 14.868 0 29.775 8.864 44.307 26.345 c 0.925 1.112 0.925 2.724 0 3.836 C 74.775 64.399 59.868 73.264 45 73.264 z M 6.934 45 C 19.73 59.776 32.528 67.264 45 67.264 c 12.473 0 25.27 -7.487 38.066 -22.264 C 70.27 30.224 57.473 22.737 45 22.737 C 32.528 22.737 19.73 30.224 6.934 45 z"
              style="
                stroke: none;
                stroke-width: 1;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: rgb(0, 0, 0);
                fill-rule: nonzero;
                opacity: 1;
              "
              transform=" matrix(1 0 0 1 0 0) "
              stroke-linecap="round"
            />
            <path
              d="M 45 62 c -9.374 0 -17 -7.626 -17 -17 s 7.626 -17 17 -17 s 17 7.626 17 17 S 54.374 62 45 62 z M 45 34 c -6.065 0 -11 4.935 -11 11 s 4.935 11 11 11 s 11 -4.935 11 -11 S 51.065 34 45 34 z"
              style="
                stroke: none;
                stroke-width: 1;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: rgb(0, 0, 0);
                fill-rule: nonzero;
                opacity: 1;
              "
              transform=" matrix(1 0 0 1 0 0) "
              stroke-linecap="round"
            />
          </g>
        </svg>
      </div>
      <div v-if="field?.error" class="blood">
        {{ field.error }}
      </div>
    </div>
    <!-- Submit Button -->
  </div>
  <div
    :class="
      custom_class?.buttonPosition
        ? custom_class?.buttonPosition
        : 'w-full flex justify-start items-center col-span-2'
    "
  >
    <button
      @click="submitForm"
      :class="
        custom_class?.button
          ? custom_class?.button
          : 'mt-4 flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 text-center text-sm font-semibold text-black shadow-sm transition-colors duration-200 hover:bg-gray-300'
      "
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
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
// props for the component
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
    type: Object,
    required: false,
  },
});

const filter = ref();
const formModel = reactive({ ...props.model });

// toggle password field from text to password and password to text
const togglePass = (index) => {
  const field = filter.value[index];
  if (field && field.type === "password") {
    field.showPass = !field.showPass;
  }
};

onMounted(async () => {
  // Filter fields based on custom class if provided
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
});
const emit = defineEmits(["submit"]);

const onChange = async (indexX) => {
  filter.value = await filter.value.map((element, index) => {
    if (indexX === index) {
      const value = formModel[element.name];

      // Required field validation
      if (element.validation?.required && !value) {
        return { ...element, error: `${element.name} is required` };

        // String validation
      } else if (element.validation?.string && typeof value !== "string") {
        return { ...element, error: `${element.name} must be a string` };

        // Number validation
      } else if (element.validation?.number && typeof value !== "number") {
        return { ...element, error: `${element.name} must be a number` };

        // Minimum length validation
      } else if (
        element.validation?.min &&
        value.length < element.validation.min
      ) {
        return {
          ...element,
          error: `${element.name} must be greater than ${element.validation.min} characters`,
        };

        // Maximum length validation
      } else if (
        element.validation?.max &&
        value.length > element.validation.max
      ) {
        return {
          ...element,
          error: `${element.name} must be smaller than ${element.validation.max} characters`,
        };

        // Email validation (simple regex)
      } else if (element.validation?.email) {
        if (typeof value === "string") {
          // Ensure value is a string
          const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(value)) {
            return {
              ...element,
              error: `Invalid email format for ${element.name}`,
            };
          } else {
            return { ...element, error: null };
          }
        }
      } else {
        // No validation errors
        return { ...element, error: null };
      }
      return element;
    }
    return element;
  });
};
const submitForm = async () => {
  // Validate fields and emit event with form data if valid
  filter.value = await filter.value.map((element) => {
    const value = formModel[element.name];

    // Required field validation
    if (element.validation?.required && !value) {
      return { ...element, error: `${element.name} is required` };

      // String validation
    } else if (element.validation?.string && typeof value !== "string") {
      return { ...element, error: `${element.name} must be a string` };

      // Number validation
    } else if (element.validation?.number && typeof value !== "number") {
      return { ...element, error: `${element.name} must be a number` };

      // Minimum length validation
    } else if (
      element.validation?.min &&
      value.length < element.validation.min
    ) {
      return {
        ...element,
        error: `${element.name} must be greater than ${element.validation.min} characters`,
      };

      // Maximum length validation
    } else if (
      element.validation?.max &&
      value.length > element.validation.max
    ) {
      return {
        ...element,
        error: `${element.name} must be smaller than ${element.validation.max} characters`,
      };

      // Email validation (simple regex)
    } else if (element.validation?.email) {
      if (typeof value === "string") {
        // Ensure value is a string
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          return {
            ...element,
            error: `Invalid email format for ${element.name}`,
          };
        } else {
          return { ...element, error: null };
        }
      }
    } else {
      // No validation errors
      return { ...element, error: null };
    }

    return element;
  });
  // Check if any field has errors
  const noErrors = filter.value.every((element) => !element.error);

  // Submit the form if there are no errors
  if (noErrors) {
    emit("submit", formModel);
  }
};
</script>

<style scoped>
.blood {
  color: red;
  font-size: 12px;
  padding: 0.5rem;
}
</style>
