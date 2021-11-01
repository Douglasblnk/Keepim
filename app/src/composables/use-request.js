import Axios from 'axios';
import { computed } from 'vue';

export default function() {
  const baseUrl = computed(() => {
    const { MODE, VITE_BASE_API_URL } = import.meta.env;

    if (MODE === 'development') return 'http://192.168.10.22:4000/dev';
    return VITE_BASE_API_URL;
  });

  const handleError = (error) => {
    const { response } = error;

    if (!response) return error;

    const { data, status } = response;

    if (data && status !== 200) return { data, status };
  };

  const request = async(args) => {
    const { path, ...options } = args;
    const axiosResponse = {};

    try {
      const response = await Axios(
        `${baseUrl.value}/${path}`,
        { ...options },
      );

      axiosResponse.response = response;
      axiosResponse.data = response.data;
    }
    catch (error) {
      axiosResponse.error = handleError(error);
    }

    return { ...axiosResponse };
  };

  const useAxios = path => ({
    get: options => request({ method: 'GET', ...options, path }),

    post: options => request({ method: 'POST', ...options, path }),

    put: options => request({ method: 'PUT', ...options, path }),

    delete: options => request({ method: 'DELETE', ...options, path }),
  });

  return {
    useAxios,
  };
}
