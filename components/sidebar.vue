<template>
  <div data-simplebar="init" class="h-full overflow-scroll">
    <div class="simplebar-wrapper" style="margin: 0px">
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer"></div>
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset" style="right: 0px; bottom: 0px">
          <div
            class="simplebar-content-wrapper"
            tabindex="0"
            role="region"
            aria-label="scrollable content"
            style="height: auto; overflow: hidden scroll"
          >
            <div class="simplebar-content" style="padding: 0px">
              <ul
                class="admin-menu hs-accordion-group flex w-full flex-col gap-1.5 p-4"
              >
                <li class="" v-for="(list, index) in vendorSideBar">
                  <div v-if="!list.children">
                    <RouterLink
                      class="flex w-full items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      :to="list.url"
                      @click="
                        () => {
                          vendorSideBar.forEach((item) => {
                            item.isSelected = false;
                          });
                        }
                      "
                    >
                      <component
                        :is="icons[list.icon]"
                        class="icon-class"
                        :style="{ height: '20px', width: '20px' }"
                      />
                      {{ list.title }}
                    </RouterLink>
                  </div>
                  <div v-if="list.children">
                    <button
                      class="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      @click="
                        () => {
                          vendorSideBar.forEach((item, innerIndex) => {
                            if (innerIndex == index) {
                              item.isSelected = !list.isSelected;
                            } else {
                              item.isSelected = false;
                            }
                          });
                        }
                      "
                      :class="{ 'bg-gray-100': list.isSelected }"
                    >
                      <component
                        :is="icons[list.icon]"
                        class="icon-class"
                        :style="{ height: '20px', width: '20px' }"
                      />
                      {{ list.title }}
                      <svg
                        stroke="currentColor"
                        class="ms-auto transition-all duration-500"
                        :class="{ 'rotate-180': list.isSelected }"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                    <div class="w-full overflow-hidden">
                      <ul
                        class="transition-all duration-500 mt-0 space-y-0"
                        :class="{ 'mt-2 space-y-2': list.isSelected }"
                      >
                        <li
                          class="transition-[height] duration-500 h-0"
                          v-for="child in list.children"
                          :class="{ 'h-10': list.isSelected }"
                        >
                          <RouterLink
                            class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm font-medium text-default-700 rounded-md hover:bg-primary-50 group-[.active]:text-primary group-[.active]:bg-primary/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                            :to="child.url"
                          >
                            <BsDot />
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  AkDashboard,
  CaSettingsAdjust,
  McDishCoverFill,
  TaBrandBooking,
  FlFilledTableDeleteRow,
  FlPayment,
  BxCategory,
  CoBike,
  AkVideo,
  CaBlog,
  MdOutlinedLocalOffer,
  OwOflSelling,
  LaPepperHotSolid,
  BxSolidCoupon,
  FaQ,
  FaListOl,
  AkPerson,
  AkChatDots,
  ReArrowDropDownLine,
  ReArrowDropUpLine,
  BsDot,
} from "@kalimahapps/vue-icons";
const vendorSideBar = ref([
  {
    title: "Dashboard",
    url: "/",
    isSelected: false,
    icon: "AkDashboard",
  },
  {
    title: "Order",
    url: "",
    isSelected: false,
    icon: "FaListOl",
    children: [
      { title: "Order List", url: "/list-order" },
      { title: "Order Details", url: "/detail-order" },
    ],
  },
  {
    title: "Menu",
    url: "",
    isSelected: false,
    icon: "McDishCoverFill",
    children: [
      { title: "Menu List", url: "/list-menu" },
      { title: "Add Menu", url: "/add-menu" },
    ],
  },
  {
    title: "Booking",
    url: "",
    isSelected: false,
    icon: "TaBrandBooking",
    children: [
      { title: "Booking List", url: "/list-booking" },
      { title: "Add booking", url: "/add-booking" },
      { title: "Edit booking", url: "/edit-booking" },
    ],
  },
  {
    title: "Category",
    url: "",
    isSelected: false,
    icon: "BxCategory",
    children: [
      { title: "Category List", url: "/list-category" },
      { title: "Add Category", url: "/add-category" },
    ],
  },
  {
    title: "Sub Category",
    url: "",
    isSelected: false,
    icon: "BxCategory",
    children: [
      { title: "Sub Category List", url: "/list-sub-category" },
      { title: "Add Sub Category", url: "/add-sub-category" },
    ],
  },
  {
    title: "Manager",
    url: "",
    url: "",
    isSelected: false,
    icon: "AkPerson",
    children: [
      { title: "Manager List", url: "/list-manager" },
      { title: "Add Manager", url: "/add-manager" },
    ],
  },
  {
    title: "Customer",
    url: "",
    isSelected: false,
    icon: "AkPerson",
    children: [
      { title: "Customer List", url: "/list-customer" },
      { title: "Customer Details", url: "/detail-customer" },
    ],
  },
  {
    title: "Payment Details",
    url: "/detail-payment",
    isSelected: false,
    icon: "FlPayment",
  },
  {
    title: "Offers",
    url: "",
    isSelected: false,
    icon: "MdOutlinedLocalOffer",
    children: [
      { title: "Offer List", url: "/list-offer" },
      { title: "Add Offer", url: "/add-offer" },
    ],
  },
  {
    title: "Ingrediant",
    url: "",
    isSelected: false,
    icon: "LaPepperHotSolid",
    children: [
      { title: "Ingrediant List", url: "/list-ingredient" },
      { title: "Add Ingrediant", url: "/add-ingredient" },
    ],
  },
  {
    title: "Coupons",
    url: "",
    isSelected: false,
    icon: "BxSolidCoupon",
    children: [
      { title: "Coupon List", url: "/list-coupon" },
      { title: "Add Coupon", url: "/add-coupon" },
    ],
  },
  {
    title: "Chat",
    url: "/chat",
    isSelected: false,
    icon: "AkChatDots",
  },
]);
const icons = {
  AkDashboard,
  CaSettingsAdjust,
  McDishCoverFill,
  TaBrandBooking,
  FlPayment,
  BxCategory,
  CoBike,
  AkVideo,
  CaBlog,
  MdOutlinedLocalOffer,
  OwOflSelling,
  LaPepperHotSolid,
  BxSolidCoupon,
  FaQ,
  FaListOl,
  AkPerson,
  AkChatDots,
};
</script>
<style lang="scss" scoped></style>
