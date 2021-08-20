import Axios from 'axios';

export default function() {
  const baseUrl = () => {
    const { MODE, VITE_BASE_API_URL } = import.meta.env;

    if (MODE === 'development') return 'http://localhost:4000/dev';
    return VITE_BASE_API_URL;
  };

  const useAxios = async(path, options = {}) => {
    const axiosResponse = {};

    try {
      const response = await Axios(
        `${baseUrl()}/${path}`,
        { ...options },
      );
      console.log('response :>> ', response);
      axiosResponse.response = response;
      axiosResponse.data = response.data;
    }
    catch (error) {
      axiosResponse.error = error;
    }

    return { ...axiosResponse };
  };

  return {
    useAxios,
  };
}
