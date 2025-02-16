import { generateToken } from "../helpers/common.helper";
import { LoginData, LoginMethodOutput } from "../interfaces/login-data.interface";

export default class CommonController {
    logout(req: Request, res: Response) {
        // req.logout();
        // res.redirect("/");
    }
    login(data: LoginData): LoginMethodOutput {
        const { userId, password } = data;
        const maxAge = 60 * 60 * 1000;
        const token: string = generateToken(userId, password);
        const loginMethodOutput: LoginMethodOutput = {
            status: 200,
            body: {
                success: true,
                token
            }
        };
        return loginMethodOutput 
    }
}