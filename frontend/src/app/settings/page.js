"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { forbidden } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Audio} from "react-loader-spinner"
import { GET, POST } from "../utils/apiHandler"
import { decrypt } from "../assets/encription"
export default function UserProfile() {
    let jwtToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    console.log("Token : ",jwtToken)
    const initailState = {
        username : "",
        name : "",
        email : "",
        avatar : "",
        bio:""
    }
    const [mainLoader, setMainLoader] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setMainLoader(false)
            fetchProfile()
        },3000)
    },[])
    const validationSchema = Yup.object({
        username: Yup.string().min(3).required("Username is required"),
        name: Yup.string().min(5).required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        avatar: Yup.string().required("Profile picture is required"),
        bio: Yup.string().min(10).required("Bio is required"),
        privacy : Yup.string().required()
    })
    
    const formik = useFormik({
        initialValues: initailState,
        validationSchema : validationSchema,
        onSubmit : async (values,{resetForm})=>{
            try{
                const userData = {
                    username : values.username,
                    name : values.name,
                    email : values.email,
                    bio : values.bio,
                    privacy : values.privacy
                }
                console.log("Data : ",userData)

                let formData = new FormData();
                formData.append("profile_img", values.avatar);
                let fileResponse = await axios.post("http://localhost:3300/v1/user/upload-profile", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept-language': 'en',
                        'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY
                    }
                })
                let fileResult = decrypt(fileResponse.data);
                fileResult = await JSON.parse(fileResult)
                console.log("Response Data : ",fileResult)
                if (fileResult.code == 1 || fileResult.code == 0) {
                    userData.avatar = fileResult.data
                    let response = await POST(userData, jwtToken, "updateProfile")
                    console.log("Response : ",response)
                    if(response.code == 1){
                        notify("Profile updated successfully!")
                    }else{
                        errorNotify("Error updating profile!")
                    }
                }
    
                resetForm()
            }catch(error){
                console.log(error)
                errorNotify("An error occurred while updating profile")
            }
        }
    })

    const fetchProfile = async()=>{
        try {
            const response = await GET("",jwtToken,"getProfile")
            if(response.code == 1){
                console.log("this is Data : ",response.data.avtar)
                formik.setValues({
                    username: response.data.username,
                    name: response.data.name,
                    email: response.data.email,
                    avatar: response.data.avtar,
                    bio: response.data.bio,
                    privacy : response.data.privacy
                })
                console.log(`This is URL : ${formik.values.avatar}`)
                notify("Profile loaded successfully!")
            }else{
                errorNotify("Error loading profile data")
            }
        } catch (error) {
            console.error(error)
            errorNotify("Failed to fetch profile")
        }
    }

    const [edit, setEdit] = useState(false)
    const setEditFun = ()=>{
        setEdit(!edit)
    }

    useEffect(()=>{
        fetchProfile()
    },[])

    const notify = (message)=>{
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const errorNotify = (message)=>{
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    return (<>
        {mainLoader ?
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <Audio
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                />
            </div>
            :
            <div className="container mt-4">
                <ToastContainer />
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-8 mx-auto border border-1 p-4">
                            <h1 className="text-secondary mt-3 mb-4">{edit ? "Edit Profile":"View Profile"}</h1>
                            
                            {/* Avatar Section at Top */}
                            <div className="row mb-4">
                                <div className="col-12 d-flex justify-content-center">
                                    {edit ? 
                                        <input
                                            type="file"
                                            name="avatar"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(event) => {
                                                formik.setFieldValue("avatar", event.currentTarget.files[0])
                                            }}
                                            style={{maxWidth: '200px'}}
                                        />
                                        :
                                        <div className="border border-3 border-danger rounded-circle animate__animated animate__pulse" style={{animationIterationCount: 'infinite'}}>
                                            <img 
                                                src={`http://localhost:3300/uploads/${formik.values.avatar}`}
                                                alt="Profile Avatar" 
                                                className="img-fluid rounded-circle"
                                                style={{width: '150px', height: '150px', objectFit: 'cover'}}
                                            />
                                        </div>
                                    }
                                    {formik.touched.avatar && formik.errors.avatar && 
                                        <div className="text-danger">{formik.errors.avatar}</div>}
                                </div>
                            </div>

                            {/* Profile Details Section */}
                            <div className="row mt-2">
                                <div className="col-12">
                                    <input 
                                        type="text" 
                                        name="username" 
                                        value={formik.values.username} 
                                        className="form-control" 
                                        readOnly={!edit} 
                                        placeholder="Enter Username" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.username && formik.errors.username && 
                                        <div className="text-danger">{formik.errors.username}</div>}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formik.values.name} 
                                        className="form-control" 
                                        readOnly={!edit} 
                                        placeholder="Enter Name" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name && 
                                        <div className="text-danger">{formik.errors.name}</div>}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formik.values.email} 
                                        className="form-control" 
                                        readOnly={!edit} 
                                        placeholder="Enter Email" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email && 
                                        <div className="text-danger">{formik.errors.email}</div>}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <textarea
                                        name="bio"
                                        value={formik.values.bio}
                                        className="form-control"
                                        readOnly={!edit}
                                        placeholder="Enter Bio"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        rows="4"
                                    />
                                    {formik.touched.bio && formik.errors.bio && 
                                        <div className="text-danger">{formik.errors.bio}</div>}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12">
                                    <select
                                        name="privacy"
                                        value={formik.values.privacy}
                                        className="form-control"
                                        disabled={!edit}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="private">Private</option>
                                        <option value="public">Public</option>
                                        <option value="follower">Follower</option>
                                    </select>
                                    {formik.touched.privacy && formik.errors.privacy && 
                                        <div className="text-danger">{formik.errors.privacy}</div>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    {!edit ? 
                                        <a className="btn btn-outline-primary"  onClick={setEditFun}>Edit Profile</a> : 
                                        <button className="btn btn-outline-primary" type="submit">Update Profile</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        }
    </>
    )
}