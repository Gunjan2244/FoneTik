import axios from "axios";

const API = axios.create({
    baseURL: "https://fone-tik-t378-extf6riv1-gunjans-projects-d8c48229.vercel.app/", // backend URL
    // baseURL: "http://localhost:8000", // for local development
});

// If you want to attach token for logged-in routes later:
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
