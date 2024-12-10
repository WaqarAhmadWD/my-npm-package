const showMessage = (color, message, timer = 3000) => {
  // Remove the existing toast
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create the toast container if it doesn't exist
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "10px";
    container.style.right = "10px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  // Create the toast element
  const toast = document.createElement("div");
  toast.classList.add("toast", `toast-${color}`);
  toast.innerHTML = `
  ${message}
  <span class="close-icon cursor-pointer">&times;</span>
  `;
  toast.querySelector(".close-icon").addEventListener("click", () => {
    toast.remove();
  });

  // Append the toast to the container
  document.getElementById("toast-container").appendChild(toast);

  // Remove the toast after the specified timer
  if (timer !== null) {
    setTimeout(() => {
      toast.remove();
    }, timer);
  }
};

export const makeRequest = async ({
  url = null,
  method = "GET",
  data = null,
  type = "json",
  message = true,
  error = true,
  loading = true,
  throwMe = null,
  refresh = false,
  showMe = null,
}) => {
  if (loading) {
    showMessage("loading", `<span>Loading...</span>`, null);
  }
  if (throwMe) {
    showMessage("error", throwMe === true ? "Image is required" : throwMe);
    return;
  }
  if (showMe) {
    showMessage("success", showMe === true ? "Acknowledged" : showMe);
    return;
  }
  if (!url) {
    showMessage("error", "URL is required");
    return;
  }
  try {
    // Handle loading state

    // Configure headers and data for different content types
    const headers = {
      "Content-Type":
        type.toLowerCase() === "form"
          ? "multipart/form-data"
          : "application/json",
    };

    if (type.toLowerCase() === "form" && data) {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          // Check if the array contains File or Blob instances
          if (
            data[key].every(
              (item) => item instanceof File || item instanceof Blob
            )
          ) {
            if (data[key].length > 1) {
              data[key].forEach((file) => {
                formData.append(key, file);
              });
            }
          } else {
            formData.append(key, JSON.stringify(data[key]));
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      data = formData;
    }

    const config = { headers, method };
    if (method !== "GET" && data) config.body = JSON.stringify(data);

    const response = await fetch(url, config);

    // Check if the response is not OK (status code 4xx or 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Safely parse JSON if available
      throw { response: { status: response.status, data: errorData } }; // Mimic Axios-style error
    }

    // Handle success response
    if (message) {
      showMessage(
        "success",
        response?.data?.message ||
          "no message from backend side but the request is successful",
        3000
      );
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    const { status, data } = err.response || {};
    let errorMsg = data?.message ? data?.message : null;
    errorMsg = data?.error ? data?.error : errorMsg;
    errorMsg =
      data?.message && data?.error
        ? `${data?.message} , ${data?.error}`
        : errorMsg;

    // Handle common errors with centralized messages
    const errorMessages = {
      401: "Authentication failed: Wrong credentials",
      404: "Resource not found: The requested endpoint does not exist",
      500: "Server error: Please try again later",
      400: "Bad request: Invalid input or parameters",
      403: "Access denied: You do not have permission to perform this action",
      409: "Conflict: Data already exists or is in conflict",
    };

    errorMsg = errorMsg
      ? errorMsg
      : errorMessages[status]
      ? errorMessages[status]
      : "unexpected error";
    if (error) showMessage("error", errorMsg, null);

    return { error: errorMsg };
  }
};
