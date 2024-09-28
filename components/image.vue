<template>
    <Form class="rounded-lg px-6" v-if="schema" :validation-schema="schema">
      <div
        class="w-full flex flex-col items-center justify-center rounded-lg border border-default-200"
        :class="{
          'mb-4': custom_class === 0,
          '': custom_class === 1,
        }"
      >
        <div
          class="bg-white"
          :class="{
            'py-3 px-2': custom_class === 0,
            'h-28 w-64 p-0': custom_class === 1,
          }"
        >
          <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div class="md:flex">
              <div
                class="w-full"
                :class="{
                  'p-3': custom_class === 0,
                  'py-3': custom_class === 1,
                }"
              >
                <div
                  v-for="field in fields"
                  :key="field.name"
                  class="relative rounded-lg border-dashed border-2 border-[#f6821d] bg-[#fef1e8] flex justify-center items-center my-10"
                  :class="{
                    'h-48': custom_class === 0,
                    'h-24': custom_class === 1,
                  }"
                >
                  <div class="absolute" v-if="previews[field.name]">
                    <img
                      :src="previews[field.name]"
                      :alt="field.name"
                      class="object-contain h-full w-full"
                    />
                  </div>
                  <div class="absolute" v-else>
                    <div class="flex flex-col items-center">
                      <BsUpload class="text-xl text-[#f6821d]" />
                      <span class="block text-gray-500 font-normal">{{
                        $t(field.title)
                      }}</span>
                    </div>
                  </div>
  
                  <Field
                    :type="field.type"
                    @change="(event) => handleFileUpload(event, field.name)"
                    accept="image/*"
                    class="h-full w-full opacity-0"
                    :name="field.name || 'defaultName'"
                  />
  
                  <ErrorMessage class="text-red-500" :name="field.name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { BsUpload } from "@kalimahapps/vue-icons";
  
  const props = defineProps({
    fields: {
      type: Array, // Fields is an array of objects
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    custom_class: {
      type: [String, Number],
      required: false,
    },
  });
  
  const schema = ref();
  const data = ref([]);
  const previews = ref({}); // Store previews for each field
  
  onMounted(async () => {
    // Construct Yup validation schema
    schema.value = await yup.object(
      props.fields.reduce((result, field) => {
        let validationRule;
  
        // Evaluate and set schema rule from field.schema (string)
        if (field.schema) {
          validationRule = eval(field.schema);
        } else {
          validationRule = yup.mixed(); // Default rule when schema is not provided
        }
  
        result[field.name] = validationRule;
        return result;
      }, {})
    );
  });
  
  const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    const existingFileIndex = data.value.findIndex((entry) => entry.field === fieldName);

    if (existingFileIndex !== -1) {
      data.value[existingFileIndex].file = file;
    } else {
      data.value.push({ field: fieldName, file });
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value[fieldName] = e.target.result;
      submitForm();
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select an image file.");
  }
};

  
  const emit = defineEmits(["submit"]);
  
  const submitForm = () => {
    emit("submit", data.value);
  };
  </script>
  
  <style scoped></style>
  