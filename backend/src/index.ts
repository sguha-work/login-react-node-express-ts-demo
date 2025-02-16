import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { routes } from "./routes/routes";
import CommonController from "./controllers/common.controller";
import { RouteData } from "./interfaces/route-data.interface";
dotenv.config();
const port = process.env.PORT;
const controller = new CommonController();

const swaggerDocs = YAML.load('./openapi.yaml');

const app = express();
const generateToken = (userId: string, password: string) => {
  const secretKey: string = process.env.SECRET_KEY || "";
  const payload = {
    userId,
    password // Storing passwords in JWTs is not recommended; use hashes instead.
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const keys = Object.keys(routes);
keys.forEach((method: string, index1: number) => {
  routes[method].forEach((route: RouteData, index2: number) => {
    console.log(`(${index1}-${index2}) ${method} --> "${route.path}"`);
    if (route.path.includes('login')) {
      app.post("/login", (req: Request, res: Response) => {
        const { userId, password } = req.body;
        const result: any = controller.login({userId, password});
        if(result.body.success){
          res.cookie("accessToken", result.body.token, {
            httpOnly: true,// mast set to true in production
            secure: true, // Set to true in production (HTTPS required)
            maxAge: 60 * 60 * 1000
          });
          delete result.body.token;
          res.status(200).json(result);
        } else {
          res.status(401).json(result);
        }
      })

    } else {
      //@ts-ignore
      app[method](route.path, controller[route.handler]);
    }
  });
});


app.get("/get-token", (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET_KEY || "", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { iat, exp } = decoded
    res.json({ iat, exp });
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
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
