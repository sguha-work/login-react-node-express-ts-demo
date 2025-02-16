"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (userId, password) {
    var secretKey = process.env.SECRET_KEY || "";
    console.log(secretKey);
    var payload = {
        userId: userId,
        password: password
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
