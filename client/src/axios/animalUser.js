import axios from 'axios'

const URL = 'http://localhost:3000/api/animaluser';
const token = localStorage.getItem('access_token');

const userLike = async (id, cb) => {
    try {
        await axios({
            method: 'POST',
            url: URL + '/add',
            data: {
                animalId: id
            },
            headers: {
                access_token: token
            }
        })
        cb();
    } catch (error) {
        console.log(error);
    }
}

const userUnlike = async (id, cb) => {
    try {
        await axios({
            method: 'DELETE',
            url: URL + '/delete' + `/${id}`,
            headers: {
                access_token: token
            }
        })
        cb();
    } catch (error) {

    }
}

const getLikeData = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: URL + '/info',
            headers: {
                access_token: token
            }
        })
        cb(result.data.resultUA.animals);
    } catch (error) {
        console.log(error);
    }
}

export {
    userLike,
    getLikeData,
    userUnlike
}