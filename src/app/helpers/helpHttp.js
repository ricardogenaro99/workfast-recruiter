import { auth } from "../../config/firebase";

export const helpHttp = () => {
	const customFetch = async (endpoint, options) => {
		const token = auth.currentUser
			? await auth.currentUser.getIdToken()
			: "";

		const defaultHeader = {
			Accept: "application/json",
			"content-type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		const controller = new AbortController();
		options.signal = controller.signal;
		options.method = options.method || "GET";
		options.headers = options.headers
			? { ...defaultHeader, ...options.headers }
			: defaultHeader;

		options.body = JSON.stringify(options.body) || false;

		if (!options.body) delete options.body;

		setTimeout(() => {
			controller.abort();
		}, 10000);

		try {
			const res = await fetch(endpoint, options);
			return await (res.ok
				? res.json()
				: Promise.reject({
						err: true,
						status: res.status || "00",
						statusText: res.statusText || "Ocurrio un error",
				  }));
		} catch (err) {
			throw new Error("Ocurrio un error en el servidor.");
		}
	};

	const get = (url, options = {}) => customFetch(url, options);

	const post = (url, options = {}) => {
		options.method = "POST";
		options.headers = {
			...options.headers,
			"content-type": "application/json",
		};
		return customFetch(url, options);
	};

	const put = (url, options = {}) => {
		options.method = "PUT";
		options.headers = {
			...options.headers,
			"content-type": "application/json",
		};
		return customFetch(url, options);
	};

	const del = (url, options = {}) => {
		options.method = "DELETE";
		return customFetch(url, options);
	};

	return {
		get,
		post,
		put,
		del,
	};
};
