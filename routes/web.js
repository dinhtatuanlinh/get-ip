const express = require("express");

const handlersController = require(__pathControllers + "handlers");
let router = express.Router();

module.exports = () => {
    // login and register

    router.get(
        '/get-ip',
        (req, res, next) => { handlersController.getIp(req, res, next) }
    );

    return router;
}