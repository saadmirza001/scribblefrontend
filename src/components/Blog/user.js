import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import '../auth/auth.css'
import Common from '../Common'
import PopUpModel from "./popUpModel";


const User = () => {
    var Token = localStorage.getItem("token")
    if(Token === null){
        window.location.href = "/login"
    }

    var Name = localStorage.getItem("name").split(" ")[0]
    var Email = localStorage.getItem("email")
    var profileUrl = `http://127.0.0.1:8000${localStorage.getItem("profileUrl")}`
    var currentUser = localStorage.getItem('currentuser')
    if (currentUser == null){
        currentUser = localStorage.getItem("username")
    }

    console.log(profileUrl)

    const [modelState, setModelState] = useState(false)
    const onSetModelOn = () => setModelState(true)
    const [callPopUp, setCallPopUp] = useState({
        call:false,
        currentBlogTitle:"",
        currentBlogId:""
    })



    const normalIcon = 'https://www.kindpng.com/picc/m/48-486744_png-file-svg-instagram-love-icon-png-icon.png'
    const likedIcon = 'https://www.pinclipart.com/picdir/middle/87-877828_save-the-heart-by-ofirma85-instagram-like-icon.png'

    const [state, setState] = useState({
        page:'user',
        blogs:0,
        likes:0,
        comments:0,
        all_blogs: [],
        othersBlogs: []
    })

    const [lastLike, setLastLike] = useState(true)

    useEffect(() => {
        var lastPage = state.page
        fetch(`${Common.CountAPI}${currentUser}/`).then(res => res.json()).then(res => {
            setState({
                blogs:res.blogs,
                likes:res.likes,
                comments:res.comments,
                all_blogs:res.all_blogs,
                othersBlogs: res.all_other_blogs,
                page:lastPage
            })
            console.log(res.all_other_blogs)
        })

    }, [lastLike])


    const changeState = () => {
        if (state.page === 'user'){
            setState((prevState) => ({...prevState, page:'other'}))
        }else {
            setState((prevState) => ({...prevState, page:'user'}))
        }

    }

    const LikeBlog = (blogId) => {
        fetch(`${Common.LikeBlogAPI}${currentUser}/${blogId}/`).then(res => res.json()).then(res => {
            console.log(res)
            if (res.Status){
                setLastLike({
                    blogId:blogId, Status:true
                })
            }else
                setLastLike({
                    blogId:blogId, Status:false
                })
        })

    }


    const makeDonation = () => {
        alert("Donation Request...")
        fetch(`${Common.SendPayRequestAPI}${currentUser}/`).then(res => res.json()).then(res => {
            window.location.href = res.payUrl
        })

    }


    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }


    const WriteComment = (blogTitle, blogId) => {
        setModelState(true)

        setCallPopUp({
           call:true,
        currentBlogTitle:blogTitle,
        currentBlogId:blogId
        })
    }



    return (
        <center>
            <div className="box">
                {
                    callPopUp.call?<PopUpModel setModelState = {setModelState} modelState={modelState} blogTitle={callPopUp.currentBlogTitle} blogId={callPopUp.currentBlogId} />:""
                }
                <img width="100" height="100" style={{borderRadius:"50%", cursor:"pointer"}} src={profileUrl} alt="" />
                <p className="heading" style={styles.Name}>Hey {Name}!
                    <img onClick={logout} width="30" src="https://cdn.iconscout.com/icon/free/png-256/open-lock-1779407-1512864.png" alt=""/>
                </p>
                <span style={styles.Email}>{Email}</span><br/>
                <span style={styles.imgSpan}>
                    <img style={styles.Icon}  src = "https://cdn.iconscout.com/icon/free/png-256/comment-2551199-2136583.png" alt="" />{state.comments}
                </span>

                <span style={styles.imgSpan}>
                    <img style={styles.Icon} src = "https://i.pinimg.com/originals/c0/d2/16/c0d21611b7e1ef0bf8486900301822a4.png" alt="" />{state.likes}
                </span>

                <span style={styles.imgSpan}>
                    <img style={styles.Icon}src = "https://static.thenounproject.com/png/154887-200.png" alt="" />{state.blogs}
                </span>

                <div style={styles.blogDiv}>
                    {
                    state.page === 'user'?
                        state.all_blogs.map((blog, index) => {
                        return (
                             <div style={{paddingTop:10}}>
                                <p key = {index} style={styles.blogTitle}>{blog.title} <span style={{fontSize:15, color:'gray'}}>{blog.date}</span></p>
                                <p style={{paddingLeft:20, paddingRight:20, marginTop:"-20px", color:'black'}}>{blog.detail}</p>
                            </div>
                        )
                    })
                        :
                    state.othersBlogs.map((blog, index ) => {
                        return (
                             <div style={{paddingTop:10}}>
                                <p key = {index} style={styles.blogTitle}>{blog.title}
                                <span style={{fontSize:15, color:'gray'}}>{blog.user_id}{blog.date}</span>
                                    {
                                        blog.isLiked === true?
                                            <img onClick={() => LikeBlog(blog.id)} width="15" src={likedIcon} alt=""/>
                                            :
                                            <img onClick={() => LikeBlog(blog.id)} width="15" src={normalIcon} alt=""/>
                                    }
                                    <img width="15" onClick={() => WriteComment(`${blog.title}`, `${blog.id}`)} src="https://simpleicon.com/wp-content/uploads/pencil.png" alt=""/>
                                    <img width="15" onClick={makeDonation} src="https://static.thenounproject.com/png/1195084-200.png" alt=""/>

                                </p>
                                <p style={{paddingLeft:20, paddingRight:20, marginTop:"-20px", color:'black'}}>{blog.detail}</p>
                            </div>
                        )
                    })


                }
                </div>

            </div>

            <div style={{width:"50%"}}>
                <Link to='/write'><button style={styles.Button}>+</button></Link>
                <button style={styles.ReadButton} onClick={() => changeState()}>
                    <img src="https://img.icons8.com/ios/452/reading.png" width="30" alt=""/>
                </button>
            </div>


        </center>
    )
}

const styles = {
    blogTitle:{
        color:'black',
        fontSize: 25,

    },
    blogDiv:{maxHeight:"320px", overflowY:'scroll'},

    blogDate:{
        float:"right",
        paddingRight: 20,
        fontSize: 20,
        color:'gray',
        fontFamily:'monospace'
    },
    blogDetail:{
        float:"right",
    },

    Email:{
        color:'darkblue',
    },
    Name:{
        marginBottom:0,
        marginTop:"-20px"
    },
    Icon:{
        width:20,
        paddingTop:10
    },
    imgSpan:{
        paddingLeft:15,
        paddingRight:15,

    },
    Button:{
        fontSize:40,
        borderRadius:"50%",
        width: 50,
        backgroundColor:'coral',
        color:'white',
        float:'right',
        marginRight:20,
        marginTop:"-60px",
        cursor:"pointer",
        zIndex:1
    },
    ReadButton:{
        fontSize:40,
        borderRadius:"50%",
        width: 50,
        backgroundColor:'white',
        borderColor:'white',
        float:'left',
        marginLeft:20,
        marginTop:"-60px",
        cursor:"pointer",
    }
}

export default User