import axios from 'axios'
import Swal from "sweetalert2";
const URL = 'http://localhost:3000/api/payment'

const getPayment = async cb => {
    try {
        let dataItems = await axios({
            method: 'GET',
            url: URL
        })
        cb(dataItems.data);
    } catch (error) {
        console.log(error);
    }
}

const updatePayment = async (data) =>{
    try{
        Swal.fire({
            title: 'Are you sure?',
            text: "Purchase the payment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Check the payment'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log({data})
            }
          })
        

    }catch(e){
        console.log(e)
    }
}


export {
    getPayment,
    updatePayment  
}