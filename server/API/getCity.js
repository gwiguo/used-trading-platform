const data = require("../mock/city.json")


module.exports = (req, res) => {
    res.send({
        code: 200,
        data
    });
}