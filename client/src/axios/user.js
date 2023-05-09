import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3000/api/users';
const token = localStorage.getItem('access_token');

const login = async (datas, cb, regis) => {
    try {
        const isRegis = regis || false;

        let result = await axios({
            method: 'POST',
            url: URL + '/login',
            data: datas
        })

        const access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);
        cb(true)

        if (!isRegis) {
            window.location.reload();
        }
    } catch (err) {
        console.log(err)
    }
}

const readDataUser = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL + "/account",
            headers: {
                access_token: token
            }
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (datas, loginCbHandler) => {
    try {
        await axios({
            method: 'POST',
            url: URL + "/create",
            data: datas,
        })

        login({ email: datas.email, password: datas.password }, loginCbHandler, true)

        await Swal.fire(
            'Congratulation!',
            'account has been created',
            'success'
        )

        window.location.reload();

    } catch (e) {
        console.log(e)
    }
}

const updateUser = async (id, datas) => {
    try {
        await axios({
            method: 'PUT',
            url: URL + `/update/${id}`,
            data: datas,
            headers: {
                'Content-Type': 'multipart/form-data',
                access_token: token
            }
        })
        await Swal.fire(
            'Edit user ' + id,
            'User ' + id + ' has been updated',
            'success'
        )
    } catch (error) {
        console.log(error);
    }
}

export {
    readDataUser,
    createUser,
    login,
    updateUser
}