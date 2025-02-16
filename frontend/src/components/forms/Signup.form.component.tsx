function SignupForm() {
    return (
        <div className="login-container">
        <h2>Sign up</h2>
        <form action="#">
            <div className="input-group">
                <label >Email</label>
                <input type="email" id="email" placeholder="Enter your email" required/>
            </div>

            <div className="input-group">
                <label >Password</label>
                <input type="password" id="password" placeholder="Enter your password" required/>
            </div>

            <button type="submit" className="login-btn">Register</button>

            <div className="links">
                <a href="#">Forgot Password?</a>
                <a href="#">Login</a>
            </div>
        </form>
    </div>
    )
  }
  
  export default SignupForm