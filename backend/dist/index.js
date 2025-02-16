"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var yamljs_1 = __importDefault(require("yamljs"));
var routes_1 = require("./routes/routes");
var common_controller_1 = __importDefault(require("./controllers/common.controller"));
dotenv_1.default.config();
var port = process.env.PORT;
var controller = new common_controller_1.default();
var swaggerDocs = yamljs_1.default.load('./openapi.yaml');
var app = (0, express_1.default)();
var generateToken = function (userId, password) {
    var secretKey = process.env.SECRET_KEY || "";
    var payload = {
        userId: userId,
        password: password // Storing passwords in JWTs is not recommended; use hashes instead.
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
};
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON request bodies
app.use((0, cookie_parser_1.default)()); // Parse cookies
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
var keys = Object.keys(routes_1.routes);
keys.forEach(function (method, index1) {
    routes_1.routes[method].forEach(function (route, index2) {
        console.log("(".concat(index1, "-").concat(index2, ") ").concat(method, " --> \"").concat(route.path, "\""));
        if (route.path.includes('login')) {
            app.post("/login", function (req, res) {
                var _a = req.body, userId = _a.userId, password = _a.password;
                var result = controller.login({ userId: userId, password: password });
                if (result.body.success) {
                    res.cookie("accessToken", result.body.token, {
                        httpOnly: true, // mast set to true in production
                        secure: true, // Set to true in production (HTTPS required)
                        maxAge: 60 * 60 * 1000
                    });
                    delete result.body.token;
                    res.status(200).json(result);
                }
                else {
                    res.status(401).json(result);
                }
            });
        }
        else {
            //@ts-ignore
            app[method](route.path, controller[route.handler]);
        }
    });
});
app.get("/get-token", function (req, res) {
    var token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "", function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        var iat = decoded.iat, exp = decoded.exp;
        res.json({ iat: iat, exp: exp });
    });
});
// app.get("/logout", (req: Request, res: Response) => {
//   const token = req.cookies.accessToken;
//   if (token) {
//     res.clearCookie("accessToken");
//   }
//   res.json({ success: true });
// });
// Start server
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
    console.log("Swagger Docs available at http://localhost:".concat(port, "/api-docs"));
});
