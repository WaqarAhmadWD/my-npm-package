export let settingsVar = null;
export const settings = (settings = null) => {
  if (!settings) {
    return;
  }

  settingsVar = settings;
};
export const variable = "test completed";

settings("1");
console.log(variable);
