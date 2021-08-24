import Axios from 'axios';

export default function() {
  const baseUrl = () => {
    const { MODE, VITE_BASE_API_URL } = import.meta.env;

    if (MODE === 'development') return 'http://localhost:4000/dev';
    return VITE_BASE_API_URL;
  };

  const request = async(...args) => {
    console.log('args :>> ', args);
    // const axiosResponse = {};

    // try {
    //   const response = await Axios(
    //     `${baseUrl()}/${path}`,
    //     { ...options },
    //   );
    //   console.log('response :>> ', response);
    //   axiosResponse.response = response;
    //   axiosResponse.data = response.data;
    // }
    // catch (error) {
    //   axiosResponse.error = error;
    // }

    // return { ...axiosResponse };
    return {};
  };

  const methods = (...args) => ({
    get: () => {
      console.log('args :>> ', args);
    },

    post: () => {
      console.log('args :>> ', args);
    },

    put: () => {
      console.log('args :>> ', args);
    },

    delete: () => {
      console.log('args :>> ', args);
    },
  });

  const useAxios = path => ({
    ...methods(path),

    headers: (...args) => {
      const headers = {
        headers: {
          ...args,
        },
      };
      console.log('headers :>> ', headers);

      return {
        ...methods(path, headers),
        data: data => useAxios(path).data(data, headers),
      };
    },

    data: (...args) => {
      const data = {
        data: {
          ...args,
        },
      };

      console.log('data :>> ', data);

      return {
        ...methods(path, data),
        headers: headers => useAxios(path).headers(headers, data),
      };
    },
  });

  return {
    useAxios,
  };
}
