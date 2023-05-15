import axios from "axios";
import Swal from "sweetalert2";
const accessToken = localStorage.getItem("access_token");
const URL = "http://localhost:3000/api/payment";

const getPayment = async (cb) => {
  try {
    let dataItems = await axios({
      method: "GET",
      url: URL,
    });
    cb(dataItems.data);
  } catch (error) {
    console.log(error);
  }
};

const updatePayment = async (data, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "Purchase the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Check the payment",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "PUT",
          url: URL + "/update",
          data: data,
          headers: { access_token: `${accessToken}` },
        });
        await Swal.fire(
          "Payment Success",
          "Order Id " + data.orderId + " has been checked",
          "success"
        );
        cb();
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const paymentFiltered = async (userName, cb) => {
  try {
    let response = await axios(
       { method: "GET",
        url: URL + `/filter?userName=${userName}`,}
    );
    cb(response);
  } catch (error) {
    console.error(error);
  }
};

export { getPayment, updatePayment, paymentFiltered };
