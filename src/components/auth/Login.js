import React from 'react'
import './auth.css'
import Common from '../Common'
import {Link} from 'react-router-dom'
const Login = () => {

    const onSubmitForm = (event) => {
        event.preventDefault()
            var loginAPI = Common.LoginAPI
            var username = document.getElementById("username");
            var password = document.getElementById("password");
            var formData = new FormData()
            formData.append('pass', password.value)
            formData.append('username', username.value)

            fetch(loginAPI, {
                method:'POST',
                body:formData
            }).then((res) => res.json()).then((res) => {
                if(res.Status == 'LoggedIn'){
                    localStorage.setItem("token", res.Token)
                    localStorage.setItem("username", res.Username)
                    localStorage.setItem("name", res.Name)
                    localStorage.setItem("email", res.Email)
                    localStorage.setItem("profileUrl", res.profileUrl)
                    window.location.href = Common.UserHomePageURL
                }else {
                    alert(res.Error)
                }
            })
    }


    return (
        <center>
            <div className="box">
                <p className="heading">Login Your Account</p>
                <form onSubmit = {onSubmitForm}>

                <div className="form-group">
                    <label>Username</label><br/>
                    <input id = "username" type="text" required placeholder="Choose Username" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Password</label><br/>
                    <input id = "password" type="password" required placeholder="Choose Password" className="form-control"/>
                </div>

                <div className="form-group">
                    <input className="submitButton" type="submit" value="Login" />
                </div>
                </form>

                <Link to = "/"><p>New User: Register</p></Link>




            </div>
        </center>
    )
}

export default Login;