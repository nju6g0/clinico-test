import axios from "axios";
const API_URL = "http://localhost:3004/api";

const searchHolder = (code) => {
  return axios.get(`${API_URL}/policyholders`, { params: { code } });
};
const getTopHolder = (code) => {
  return axios.get(`${API_URL}/policyholders/${code}/top`);
};

const PolicyHoldersService = {
  searchHolder,
  getTopHolder,
};
export default PolicyHoldersService;
