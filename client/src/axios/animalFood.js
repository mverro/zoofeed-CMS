import axios from 'axios'
import Swal from 'sweetalert2'
const accessToken = localStorage.getItem("access_token");

const URL = 'http://localhost:3000/api/animalfoods'

const addAF = async (id, form, cb) => {
    try {
        await axios({
            method: 'POST',
            url: URL + "/AF/add/" + id,
            data: form,
            headers: { access_token: `${accessToken}` }
        })

        await Swal.fire(
            'Add food',
            'food has been added',
            'success'
        )
        cb();
    } catch (e) {
        console.log(e)
    }
}

const deleteAF = async (id1, id2, cb) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "DELETE",
                    url: URL + '/AF/delete/' + id1 + '/' + id2,
                    headers: { access_token: `${accessToken}` }
                })

                await Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                cb();
            }
        })

    } catch (e) {
        console.log(e)
    }
}

const addFA = async (id, form, cb) => {
    try {
        await axios({
            method: 'POST',
            url: URL + "/FA/add/" + id,
            data: form,
            headers: { access_token: `${accessToken}` }
        })

        await Swal.fire(
            'Add food',
            'food has been added',
            'success'
        )
        cb();
    } catch (e) {
        console.log(e)
    }
}

const deleteFA = async (id1, id2, cb) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "DELETE",
                    url: URL + '/FA/delete/' + id1 + '/' + id2,
                    headers: { access_token: `${accessToken}` }
                })

                await Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                cb();
            }
        })

    } catch (e) {
        console.log(e)
    }
}


export {
    addAF,
    deleteAF,
    addFA,
    deleteFA
}