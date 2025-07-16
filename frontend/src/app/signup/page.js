"use client"
import { useFormik } from "formik"
import { useState, useEffect } from "react"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';
// import { userLogin } from "@/app/lib/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { POST } from "../utils/apiHandler";
import axios from "axios";
import { decrypt } from "../assets/encription";
import setToken from "../common/setToken";
// import { signIn,  useSession, getSession } from "next-auth/react";
export default function signUpPage() {
    // const searchParams = useSearchParams()
    const router = useRouter()
    const [btn, setBtn] = useState(false)
    const initalState = {
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
        bio: "",
    }

    const validationSchema = Yup.object({
        username: Yup.string().required("Username Required"),
        name: Yup.string().required("Name Required"),
        email: Yup.string().email().required("Email Required"),
        password: Yup.string()
            .required("Password Required !")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[!@#$%^&*]/, "Password must contain at least one special character"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Confirm Password Required"),
        bio: Yup.string().required("Bio Required"),
        avatar: Yup.mixed().required("Avtar Required")
    })
    // const callbackUrl = searchParams.get('callbackUrl') || '/user/home'
    // const {data:session, status} = useSession();
    const formik = useFormik({
        initialValues: initalState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setBtn(true)
                const userData = {
                    username: values.username,
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    bio: values.bio,
                    avatar: values.avatar ? values.avatar.name : ""
                }

                let formData = new FormData();
                formData.append("profile_img", values.avatar);
                let fileResponse = await axios.post("http://localhost:3300/v1/user/upload-profile", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Changed from 'text/plain'
                        'accept-language': 'en',
                        'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY
                    }
                })
                // console.log(fileResponse)
                let fileResult = decrypt(fileResponse.data);
                console.log(fileResult);
                fileResult = await JSON.parse(fileResult)
                console.log("3 : ",fileResult)
                if (fileResult.code == 1) {
                    userData.avatar = fileResult.data
                    console.log("This is Avtar Data : ", userData.avatar)
                    let response = await POST(userData, "", "signup")
                    if (response.code == 1) {
                        console.log("User Registered")
                        setToken(response.data.jwtToken)
                        notify("User Register Successfully")
                        setTimeout(()=>{
                            router.push("/home")
                        },3000)
                        resetForm()
                    }
                    else {
                        console.log("Errro in Regiseter")
                        errorNotify(response.data)
                    }
                }
                setBtn(false)

            } catch (error) {
                console.log(error)
            }
        }
    })
    // useEffect(() => {
    //     if (status === "authenticated") {
    //       console.log("JwtToken: ", session?.user?.jwtToken); // ✅ Should log the correct token
    //     }
    //   }, [session]);


    const notify = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const errorNotify = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <div className="col-6 mx-auto p-3 border rounded-4" style={{ borderRadius: '1rem' }}>
                            <ToastContainer></ToastContainer>
                            <h1 className="text-center text-secondary mt-1 mb-4">Sign Up</h1>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="text" name="username" className="form-control" placeholder="Enter Username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.username && formik.touched.username && <div className="text-danger">{formik.errors.username}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="email" name="email" className="form-control" placeholder="Enter Email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="text" name="name" className="form-control" placeholder="Enter Full Name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="password" name="password" className="form-control" placeholder="Enter Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="form-control"
                                        onChange={(event) => {
                                            formik.setFieldValue("avatar", event.currentTarget.files[0]);
                                        }}
                                    />
                                    {formik.errors.avatar && formik.touched.avatar && <div className="text-danger">{formik.errors.avatar}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <textarea name="bio" className="form-control" placeholder="Enter Bio" value={formik.values.bio} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.bio && formik.touched.bio && <div className="text-danger">{formik.errors.bio}</div>}
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" disabled={btn} style={{ opacity: btn ? 0.5 : 1 }} type="submit">
                                        {btn ? <div className="d-flex justify-content-center align-items-center">
                                            <Oval
                                                visible={true}
                                                height="30"
                                                width="20"
                                                color="#4fa94d"
                                                ariaLabel="oval-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </div> : "Sign Up"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}