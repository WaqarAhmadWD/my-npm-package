export let settingsVar = null;
export const settings = (settings = null) => {
  if (!settings) {
    return;
  }
  settingsVar = settings;
};

settings("1");
