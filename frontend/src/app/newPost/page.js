"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { POST } from "../utils/apiHandler"
import axios from "axios"
import { decrypt } from "../assets/encription"

export default function NewPost() {
    const [imagePreview, setImagePreview] = useState(null)
    const jwtToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required").min(5, "Title must be at least 5 characters"),
        description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
        image: Yup.mixed().required("Image is required")
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let formData = new FormData();
                formData.append("profile_img", values.image);
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
                    values.image = fileResult.data
                    let response = await POST(values,jwtToken,"newPost")
                    console.log("Response : ",response)
                    if(response.code == 1){
                        toast.success("Post created successfully!")
                        formik.resetForm()
                        setImagePreview(null)
                    }else{
                        toast.error("Failed to create post")
                    }
                } else {
                    toast.error("Failed to create post")
                }
            } catch (error) {
                console.error(error)
                toast.error("An error occurred while creating post")
            }
        }
    })

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0]
        if (file) {
            formik.setFieldValue("image", file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Create New Post</h2>
                            <form onSubmit={formik.handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <div className="invalid-feedback">{formik.errors.title}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <div className="invalid-feedback">{formik.errors.description}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        onBlur={formik.handleBlur}
                                        accept="image/*"
                                    />
                                    {formik.touched.image && formik.errors.image && (
                                        <div className="invalid-feedback">{formik.errors.image}</div>
                                    )}
                                </div>

                                {imagePreview && (
                                    <div className="mb-3 text-center">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '300px' }}
                                        />
                                    </div>
                                )}

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Create Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}