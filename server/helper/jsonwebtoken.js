const jwt = require("jsonwebtoken");
const screetCode =  process.env.SECRET_CODE || 'zoofeed'


const tokenGenerator = (data) => {
  const { id,name, email, imageUrl, age, roleId } = data;
  return jwt.sign({
    id : id,
    name: name,
    email: email,
    imageUrl: imageUrl,
    age: age,
    roleId: roleId,
  },screetCode);
};

const tokenVerifier = (data) =>{
    return jwt.verify(data,screetCode)

}


module.exports = {
    tokenGenerator,tokenVerifier
}
