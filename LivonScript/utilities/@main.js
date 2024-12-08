const Button = require("../components/Button")
const Select = require("../components/Select")
const Interface = require("../components/Interface")

let framework = {}

framework["Client"] = require("./client")
framework["components"] = {
    Button: Button,
    Select: Select,
    Interface: Interface
}

framework["configuration"] = require("../services/configuration")

module.exports = framework
