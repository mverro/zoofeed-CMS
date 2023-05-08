const bcrypt = require('bcrypt')
const salt  = +process.env.SALT_ROUND || 5 ;


const encryptPwd = data => {
    return bcrypt.hashSync(String(data),salt)
}

const decryptPwd = (data,hashPwd) => {
    return bcrypt.compareSync(String(data),hashPwd)
}

module.exports = {
    encryptPwd,decryptPwd
}