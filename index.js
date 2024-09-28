import "./global.css";

export const setting = (setting = null) => {
  if (!setting) {
    return;
  }
  // LTR to RTL
  document.body.classList.remove("ltr", "rtl");
  void document.body.offsetWidth;
  // Add new locale class
  if (setting?.rtl) {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.add("ltr");
  }
};

// import * from "/dynamic_components";
export * from "./components";
