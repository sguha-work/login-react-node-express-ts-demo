import { useRef } from "react";

function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = ()=>{
        const email: string = emailRef.current?.value;
        const password: string = passwordRef.current?.value;
        
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form action="#">
                <div className="input-group">
                    <label >Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required/>
                </div>

                <div className="input-group">
                    <label >Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required/>
                </div>

                <button type="submit" onClick={login} className="login-btn">Login</button>

                <div className="links">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Register</a>
                </div>
            </form>
        </div>
    )
}

export default LoginForm