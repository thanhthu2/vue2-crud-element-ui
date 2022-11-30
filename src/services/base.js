import axios from "axios";
import { API_CONFIG } from "@/constants/ApiConfig";

// create an axios instance
const service = axios.create({
  baseURL: API_CONFIG.VUE_APP_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: API_CONFIG.API_TIMEOUT, // request timeout,
});

service.interceptors.response.use(
  (respone) => respone.data,
  (error) => handleError(error)
);

const handleError = async (error) => {
  return Promise.reject(error);
  //do something
};

export function transformRequest(config) {
  return service.request(config).then(
    (val) => [null, val || val],
    (err) => [err, null]
  );
}
