import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3000/api/users';
const token = localStorage.getItem('access_token');

const login = async (datas, loginCbHandler, isRegis) => {
    try {
        let result = await axios({
            method: 'POST',
            url: URL + '/login',
            data: datas
        })

        const access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);

        if (!isRegis) {
            await Swal.fire(
                'Login success!',
                'congratulation',
                'success'
            )
        }
        loginCbHandler(true);
        window.location.reload()
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

    } catch (e) {
        console.log(e)
    }
}

const updateUser = async (id, datas, cb) => {
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
        cb();
        await Swal.fire(
            'Update ' + datas.name + ' information',
            'User ' + id + ' has been updated',
            'success'
        )
    } catch (error) {
        console.log(error);
    }
}

const getAllUser = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL,
        })
        cb(result.data);
    } catch (error) {
        console.log(error);
    }
}

export {
    readDataUser,
    createUser,
    login,
    updateUser,
    getAllUser
}