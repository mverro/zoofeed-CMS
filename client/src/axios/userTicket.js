import axios from 'axios'
import Swal from "sweetalert2";
const accessToken = localStorage.getItem("access_token");
const URL = 'https://zoofeed-api.vercel.app/api/userTicket'

const getUserTicket = async cb => {
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

const updateUserTicket = async (data,cb) => {
    try{
        Swal.fire({
            title: 'Are you sure?',
            text: "Check the Ticket?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Check'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await axios({
                    method: 'PUT',
                    url: URL + '/update',
                    data: data,
                    headers: { access_token: `${accessToken}` }
                })
                await Swal.fire(
                    'Check Success', 
                    'Order Id '+ data.id +' has been Entered to Zoo',
                    'success'
                )
                cb()
            }
          })

    }catch(error){
        console.log(error);
    }
}

const userTicketFiltered = async (userName, cb) => {
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



export {
    getUserTicket,updateUserTicket,userTicketFiltered
}