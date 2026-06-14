// services/api.js

export const getMe = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/me`, {
      method: "GET",
      credentials: "include", // sends JWT cookie
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error("Get Me Error:", error);
    throw error;
  }
};