"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GET,POST } from "../utils/apiHandler"
import { decrypt } from "../assets/encription"

export default function Profile() {
    const [userProfile, setUserProfile] = useState({})
    const [hide, setHide] = useState(false)
    const [id, setId] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setErrors] = useState(null)
    const [postAllComments, setPostAllComments] = useState([])
    const jwtToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    const fetchUser = async () => {
        let response = await GET("", jwtToken, "getProfile")
        if (response.code == 1) {
            setUserProfile(response.data)
        } else {
            alert("Error in fetching Profile")
        }
    }

    const fetchUsersPost = async () => {
        let response = await GET("", jwtToken, "myPostListing")
        if (response.code == 1) {
            setPosts(response.data)
        } else {
            alert("No Posts Found")
            setErrors(response.data)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchUsersPost()
    }, [])

    const fetchComments = async(id)=>{
    try {
        console.log("This is :",id)
        let response = await GET(id, jwtToken, "fetchComments")
        console.log("Response : ",response)
        if (response.code == 1) {
            setPostAllComments(response.data)
        } else {
            alert("Error fetching comments")
            return []
        }
    } catch (error) {
        console.error("Error fetching comments:", error)
        alert("Failed to fetch comments")
        return []
    }
    }
    const postComments = async()=>{
        let comment = document.getElementById("comments").value
        if(comment=="" || !comment || comment==undefined){
            alert("Comments Should not be Empty !")
            return;
        }
        let commentData = {
            post_id : id,
            comment : comment
        }
        let response = await POST(commentData,jwtToken,"postComment")
        console.log("Response of Comment : ",response)
        if(response.code != 1){
            alert("Failed to Post Comment")
        }else{
            alert("Comments Posted Successfully !")
            fetchUser()
            fetchUsersPost()
            setHide(false)
        }
    }

    const ManageLikeFunc = async (state, post_id) => {
        let stateData = {
            state: state,
            post_id: post_id
        }
        const token = localStorage.getItem("auth_token")
        let response = await POST(stateData, token, "likeStateManage")
        console.log("Response Like : ", response)
        if (response.code == 1) {
            fetchUsersPost()
        }
    }
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
            <>
                {!hide ?
                    <div className="container py-5">
                        <div className="d-flex flex-column flex-md-row align-items-center mb-5 pb-4 border p-5 border-3 border-outset rounded-3 mt-2">
                            <div className="position-relative">
                                <img src={`http://localhost:3300/uploads/${userProfile.avtar}`} className="rounded-circle me-md-4 mb-3 mb-md-0" width="130" height="130" alt="Profile" style={{ border: '4px solid white', boxShadow: '0 0 0 4px #dee2e6, 0 0 20px rgba(0,0,0,0.3)' }} />
                                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style={{ border: '2px solid rgba(255,255,255,0.5)', pointerEvents: 'none' }}></div>
                            </div>
                            <div>
                                <h3 className="mb-1">{userProfile.username}</h3>
                                <h6 className="text-muted mb-2">{userProfile.name}</h6>
                                <p>{userProfile.bio}</p>
                                <div className="d-flex gap-4 text-secondary">
                                    <span><strong>{userProfile.posts}</strong> Posts</span>
                                    <span><strong>{userProfile.followers}</strong> Followers</span>
                                    <span><strong>{userProfile.following}</strong> Following</span>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
                            {Array.isArray(posts) && posts.length > 0 ?
                                posts.map((items) => (
                                    <div className="col-12 col-sm-6 col-md-4" key={items.id}>
                                        <div className="card h-100 shadow-sm insta-post">
                                            
                                            <img src={`http://localhost:3300/uploads/${items.image}`} className="card-img-top" alt={items.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                                            <div className="card-body p-3">
                                                <div className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                                {items.LIKESTATUS == "LIKED" ?
                                                        <button className="btn btn-link text-dark p-0 d-flex align-items-center gap-2" onClick={() => { ManageLikeFunc("unlike", items.id) }}>
                                                            <i className="bi bi-heart-fill text-danger fs-2"></i>
                                                        </button> :
                                                        <button className="btn btn-link text-dark p-0 d-flex align-items-center gap-2" onClick={() => { ManageLikeFunc("like", items.id) }}>
                                                            <i className="bi bi-heart fs-2"></i>
                                                        </button>}
                                                    <button className="btn btn-link text-dark p-0 d-flex align-items-center gap-2" onClick={() => { setId(items.id); fetchComments(items.id); setHide(true) }}>
                                                        <i className="bi bi-chat fs-2"></i>
                                                    </button>
                                                    <button className="btn btn-link text-dark p-0 d-flex align-items-center gap-2">
                                                        <i className="bi bi-send fs-2"></i>
                                                    </button>
                                                </div>
                                                <div className="mb-2">
                                                    <span className="fw-bold me-2">{userProfile.username}</span>
                                                    <span>{items.title}</span>
                                                </div>
                                                <div className="text-muted small">
                                                    <span className="me-3">{items.total_likes} likes</span>
                                                    <span>{items.total_comments} comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                                : null}
                        </div>
                    </div> : 

                <div className="container py-5">
                    {/* Comment Input Section */}
                    <div className="mb-4">
                        <textarea 
                            id = "comments"
                            className="form-control" 
                            rows="3" 
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={()=>{postComments()}} className="btn btn-primary mt-2">Post Comment</button>
                    </div>

                    {/* Comments Listing */}
                    <div className="list-group">
                        {Array.isArray(postAllComments) && postAllComments.length > 0 ? (
                            postAllComments.map((comment) => (
                                <div className="list-group-item" key={comment.id}>
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={`http://localhost:3300/uploads/${comment.avtar}`} 
                                            className="rounded-circle me-3" 
                                            width="40" 
                                            height="40" 
                                            alt="User"
                                        />
                                        <div>
                                            <div className="fw-bold">{comment.username}</div>
                                            <small className="text-muted">
                                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </small>
                                            <p className="mb-0">{comment.comments}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-muted py-3">No comments yet</div>
                        )}
                        </div>
                    </div>
                }

            </>
        </>
    )
}
