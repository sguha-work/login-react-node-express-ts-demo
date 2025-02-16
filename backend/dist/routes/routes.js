"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = {
    "get": [
        {
            "path": "/logout",
            "handler": "logout"
        }
    ],
    "post": [
        {
            "path": "/login",
            "handler": "login"
        }
    ]
};
