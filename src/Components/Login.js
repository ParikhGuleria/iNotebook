import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "" });

    //to redirect after login:
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/loginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);

       if (json.success) {
            //save the auth token and redirect:
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("LogIn Successfull ","success")

        }
        else {
            props.showAlert("Invalid email or password","danger")
        } 
    }

    const onChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    }

    return (
        <div className='mt-3'>
            <h2>LogIn to continue to iNotebook</h2>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
    )
}

export default Login
