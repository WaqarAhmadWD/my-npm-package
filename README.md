# 🌟 **Vue3 Dashboard Builder**

A powerful and lightweight Vue 3 dashboard builder with TailwindCSS. Build modern dashboards effortlessly with dynamic components and seamless customization. 🚀

---

## ✨ **Features**

- **Dynamic Forms with Validation**  
  Easily create and style dynamic forms with integrated validation.  
  🎨 Customize to fit your design needs.

- **Dynamic Navbar System**  
  - Route management made easy!  
  - Supports nested routes and sub-routing seamlessly.

- **DataTable**  
  - Minimal configuration required.  
  - Fully customizable styles to match your theme.

- **REST API Handler**  
  - Effortlessly handle API requests with streamlined configuration.  
  - Centralized error handling for robust applications.

- **RTL & LTR Support**  
  - Switch between **Right-to-Left** (RTL) and **Left-to-Right** (LTR) effortlessly with a single button click.  
  - Alignments, directions, and layouts adjust dynamically for full compatibility.

---

## 🛠️ **Dependencies**
- **None!**  
  Built to be **lightweight** and **dependency-free**.

---

## 🚀 **Current Focus**
- TailwindCSS and Vue 3 compatibility.  
- **Future Plans:** Expand functionality for broader CSS frameworks and improved capabilities.

---

## 📝 **Note**
This package is in its early stages. Contributions and feedback are welcome! Let’s make it even better. 💡  

---

## 🧭 **Getting Started**

1. Install via npm:
   ```bash
   npm install vue3-dashboard-builder

2. example of using all of them:
   ```bash
    <script setup>
    import { setting, FormD, MenuD, dataTable, makeRequest } from "vue3-dashboard-builder";
    import { ref } from "vue";
    setting({ rtl: false });
    const field = [
      {
        name: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        class: "",
        validation: {
          required: true,
          string: true,
          min: 2,
          max: 5,
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
        class: "",
        validation: {
          required: true,
          email: true,
        },
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter age",
        class: "",
        validation: {
          required: true,
          number: true,
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        class: "",
        validation: {
          required: true,
        },
      },
      {
        name: "password2",
        label: "Password2",
        type: "password",
        placeholder: "Enter your password again",
        class: "",
        validation: {
          required: true,
        },
      },
      {
        name: "description",
        label: "description",
        type: "textarea",
        placeholder: "Enter your description",
        class: "",
      },
    ];
    const custom_class = {
      main: "mb-6 grid gap-6 lg:grid-cols-2",
      buttonPosition: "",
      button: "",
    };
    
    const vendorSideBar = ref([
      {
        title: "Dashboard",
        url: "/",
        isSelected: false,
        icon: "",
      },
      {
        title: "Order",
        url: "",
        isSelected: false,
        icon: "",
        children: [
          { title: "Order List", url: "/list-order" },
          { title: "Order Details", url: "/detail-order" },
        ],
      },
      {
        title: "Menu",
        url: "",
        isSelected: false,
        icon: "",
        children: [
          { title: "Menu List", url: "/list-menu" },
          { title: "Add Menu", url: "/add-menu" },
        ],
      },
    ]);
    const toggle = ref(false);
    const toggleRTL = () => {
      toggle.value = !toggle.value;
      setting({ rtl: toggle.value });
    };
    const models = ref();
    const submit = (data) => {
      console.log(data);
    };
    
    const rows = ref([]);
    const cols = ref([]);
    
    const editUser = async (id) => {
    
      console.log(data);
    }
    
    const deleteUser = (id) => {
      console.log(id)
    }
    const fetchData = async () => {
      const data = await makeRequest({ url: "https://jsonplaceholder.typicode.com/posts" });
      if (!data?.error) {
        rows.value = data && Array.isArray(data) ? data : [data];
        if (data[0]) {
          cols.value = Object.keys(data[0]).map((key) => ({ title: key, field: key }));
        } else {
          cols.value = Object.keys(data).map((key) => ({ title: key, field: key }));
        }
      }
    }
    </script>
    
    <template>
      <div class="rounded-lg border-2 bg-gray-50 p-4 w-1/2 m-8">
        <FormD :fields="field" :model="models" @submit="submit" :custom_class="custom_class" class="" />
      </div>
      <button @click="toggleRTL"
        class="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 text-center text-sm font-semibold text-black shadow-sm transition-colors duration-200 hover:bg-gray-300'">
        {{ toggle ? "LTR" : "RTL" }}
      </button>
      <div class="w-36">
        <MenuD :fields="vendorSideBar" />
      </div>
      <button @click="fetchData">
        fetch Data
      </button>
      <dataTable title="User List" extraInfo="Updated: 2023-05-20" :cols="cols" :rows="rows">
        <template #header-name="{ column }">
          <span class="font-bold text-blue-600">{{ column.toUpperCase() }}</span>
        </template>
      
        <template #cell-email="{ value }">
          <a :href="`mailto:${value}`" class="text-blue-500 hover:underline">{{ value }}</a>
        </template>
      
        <template #cell-role="{ value }">
          <span :class="{ 'text-red-500': value === 'Admin', 'text-green-500': value === 'User' }">
            {{ value }}
          </span>
        </template>
      
        <template #cell-actions="{ row }">
          <button @click="editUser(row.id)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
          <button @click="deleteUser(row.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </template>
      </dataTable>
    </template>
