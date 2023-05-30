import axios from 'axios'
import Swal from "sweetalert2";
const accessToken = localStorage.getItem("access_token");
const URL = 'http://13.55.144.244:3000/api/ticket'

const getTicket = async cb => {
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

const getTicketId = async (id, cb) => {
    try {
        let dataItems = await axios({
            method: 'GET',
            url: URL + '/get/' + id
        })
        cb(dataItems.data);
    } catch (error) {
        console.log(error);
    }
}

const updateStock = async (data, cb) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "Update the Stock?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update Stock'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let result = await axios({
                    method: 'PUT',
                    url: URL + '/updateStock',
                    data: data,
                    headers: { access_token: `${accessToken}` }
                })
                await Swal.fire(
                    'Update Success',
                    'Ticket Id ' + data.id + ' has been updated',
                    'success'
                )
                cb()
            }
        })

    } catch (error) {
        console.log(error)
    }
}


export {
    getTicket, updateStock, getTicketId
}