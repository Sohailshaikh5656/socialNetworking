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
import { signIn,  useSession, getSession } from "next-auth/react";

export default function signInPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [btn, setBtn] = useState(false)
    const initalState = {
        email: "",
        password: "",
    }
    const callbackUrl = searchParams.get('callbackUrl') || '/home'
    const validationSchema = Yup.object({

        email: Yup.string().email().required("Email Required"),
        password: Yup.string().required("Password Required !")
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
                    email: values.email,
                    password: values.password,
                }
                console.log("Form Data : ",userData)
                const res = await signIn("userCredentials", {  // Changed to custom name
                    email: values.email,
                    password: values.password,
                    redirect: false,
                    callbackUrl
                })
                console.log(res)
                if (res?.error) {
                    errorNotify("Invalid credentials")
                    setBtn(false)
                } else {
                    notify("Login Successful")
                    const updatedSession = await getSession();
                    console.log("JwtToken: ", updatedSession?.user);
                    localStorage.removeItem("adminToken");
                    localStorage.setItem("auth_token",updatedSession?.user?.jwtToken)
                    router.push(res?.url || callbackUrl)
                }

                resetForm()
            }catch(error){
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
                            <h1 className="text-center text-secondary mt-1 mb-4">Sign In</h1>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="email" name="email" className="form-control" placeholder="Enter Email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <input type="password" name="password" className="form-control" placeholder="Enter Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}
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