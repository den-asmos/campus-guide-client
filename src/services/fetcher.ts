import axios from "axios";

export const fetcher = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

fetcher.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

fetcher.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			const requestUrl = error.config?.url || "";
			if (!requestUrl.includes("/auth/sign-in")) {
				window.location.href = "/sign-in";
			}
		}

		return Promise.reject(error);
	}
);

export type RequestError = {
	error: string;
	message: string;
};
