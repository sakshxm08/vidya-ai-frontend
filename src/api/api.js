// Import axios for making HTTP requests
import axios from "axios";

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the base URL defined in environment variables
  withCredentials: true,
});

// Export the axios instance for use in other parts of the application
export default api;
