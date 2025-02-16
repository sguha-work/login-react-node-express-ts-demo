"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_helper_1 = require("../helpers/common.helper");
var CommonController = /** @class */ (function () {
    function CommonController() {
    }
    CommonController.prototype.logout = function (req, res) {
        // req.logout();
        // res.redirect("/");
    };
    CommonController.prototype.login = function (data) {
        var userId = data.userId, password = data.password;
        var maxAge = 60 * 60 * 1000;
        var token = (0, common_helper_1.generateToken)(userId, password);
        var loginMethodOutput = {
            status: 200,
            body: {
                success: true,
                token: token
            }
        };
        return loginMethodOutput;
    };
    return CommonController;
}());
exports.default = CommonController;
