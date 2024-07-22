import axios from "axios";

const baseUrl= "http://localhost:8083/api/paymentservice";
const createPayment = "/subscribe";
export const addPayment = async (Payload) => {
    return await axios.post(baseUrl + createPayment, Payload);
  };