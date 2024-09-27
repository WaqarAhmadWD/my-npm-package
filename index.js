export let settingsVar = null;
export const settings = (settings = null) => {
  if (!settings) {
    return;
  }

  settingsVar = settings;
};

// export const helloWorld = () => {
//   return (
//     <div>
//       <h1>Hello, World!</h1>
//       <p>This is a test component.</p>
//       <p>Settings: {settingsVar}</p>
//     </div>
//   );
// };
export const variable = "test completed";

settings("1");
console.log(variable);
