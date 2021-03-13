import React from 'react'
import './auth.css'
import Common from '../Common'
import {Link} from 'react-router-dom'


const Register = () => {

    const onSubmitForm = (event) => {
            var registerAPI = Common.RegisterAPI
            var name = document.getElementById("name");
            var username = document.getElementById("username");
            var password = document.getElementById("password");
            var email = document.getElementById("email");
            var mobile = document.getElementById("mobile");
            var profile = document.getElementById("profile");
            var formData = new FormData()
            formData.append('name', name.value)
            formData.append('email', email.value)
            formData.append('pass', password.value)
            formData.append('username', username.value)
            formData.append('mobile', mobile.value)
            formData.append('profile', profile.files[0])

            fetch(registerAPI, {
                method:'POST',
                body:formData
            }).then((res) => res.json()).then((res) => {
                if (res.Error){
                    username.style.borderColor = 'red'
                    username.focus()
                }else {
                    window.location.href = Common.LoginPageURL
                }
            })
    }


    const onChangeImage = (event) => {
        var imageUrl = URL.createObjectURL(event.target.files[0])
        document.getElementById("imShow").src = imageUrl
    }



    return (
        <center>
            <div className="box">
                <p className="heading">Create Your Account</p>
                <form>

                    <div className="form-group">
                        <label htmlFor="profile">
                        <img id = "imShow" src = "https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"
                             width="100" height="100" style={{borderRadius:"50%", cursor:"pointer"}}/></label><br/>
                        <input hidden accept = "Image/*" id = "profile" onChange={onChangeImage} type="file" required className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Name</label><br/>
                        <input id = "name" type="text" required placeholder="Your Full Name" className="form-control"/>
                    </div>

                <div className="form-group">
                    <label>Username</label><br/>
                    <input id = "username" type="text" required placeholder="Choose Username" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Password</label><br/>
                    <input id = "password" type="password" required placeholder="Choose Password" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Email</label><br/>
                    <input id = "email" type="email" required placeholder="Enter Your Email" className="form-control"/>
                </div>

                    <div className="form-group">
                    <label>Mobile Number</label><br/>
                    <input id = "mobile" type="number" required placeholder="Enter Your Mobile Number" className="form-control"/>
                </div>


                <div className="form-group">
                    <input className="submitButton" type="button" onClick={onSubmitForm} value="Register" />
                </div>
                </form>

                <Link to = "/login"><p>Already Registered: Login</p></Link>




            </div>
        </center>
    )
}

export default Register;