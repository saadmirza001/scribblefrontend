import React from 'react'
import '../auth/auth.css'
import Common from '../Common'
import {Link} from "react-router-dom";
const Write = () => {
    var Name = localStorage.getItem("name").split(" ")[0]
    var username = localStorage.getItem("username")

    const onSubmitBlog = (event) => {
        event.preventDefault()
        var title = document.getElementById("title");
        var blog = document.getElementById("blog");

        var formData = new FormData()
        formData.append('title', title.value)
        formData.append('blog', blog.value)
        formData.append('user', username)

        fetch(Common.WriteBlogAPI, {
            method: "POST",
            body:formData
        }).then(res => res.json()).then(res => {
            if (res.Status == "Created"){
                alert("Done")
                window.location.href = Common.UserHomePageURL
            }else {
                alert(res.Error)
            }
        })


    }

    return (
        <center>
            <div className="box">
                <p className="heading">Hey {Name}! Write Your New Blog</p>
                <form onSubmit={onSubmitBlog}>

                <div className="form-group">
                    <label>Title</label><br/>
                    <input id = "title" type="text" required placeholder="Blog Title ...." className="form-control"/>
                </div>

                <div className="form-group">
                    <textarea id = "blog" required placeholder="Start from here........" className="form-control" style={{height:150, borderRadius:10}}/>
                </div>

                <div className="form-group">
                    <input className="submitButton" type="submit" value="Create" />
                </div>
                </form>

            </div>

            <div style={{width:"50%"}}>
                <Link to='/user'><button style={styles.Button}>
                    <img style={styles.img} src="https://image.flaticon.com/icons/png/512/0/340.png"/>
                </button></Link>
            </div>

        </center>
    )
}


const styles = {
    Button:{
        fontSize:40,
        borderRadius:"50%",
        width: 50,
        backgroundColor:'white',
        borderColor:'white',
        color:'white',
        float:'right',
        marginRight:20,
        marginTop:"-60px",
        cursor:"pointer"
    },
    img:{
        borderRadius: "50%",
        width: 30
    }
}

export default Write;