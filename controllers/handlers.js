let axios = require("axios")


let getIp = (req, res, next)=>{
    axios.get(
        'https://api.ipify.org?format=json',
    ).then(result =>{
        res.send(result.data.ip);
    }).catch(err=>{
        res.send(err)
    })
}

module.exports = {
    getIp: getIp
};