"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function NaveBar() {
    const router = useRouter()
    const [isLogin, setLogin] = useState(false)

    //Check login status on component mount and route changes
    const checkLoginStatus = () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
        setLogin(!!token && token !== "" && token !== undefined)
    }

    useEffect(() => {
        checkLoginStatus()
        
        // Add event listener for storage changes
        const handleStorageChange = () => {
            checkLoginStatus()
        }
        
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [router])

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token")
            localStorage.removeItem("token")
            // Force state update before navigation
            setLogin(false)
            router.push("/signin")
        }
    }

    return (
        <>
            <nav className="bg-dark navbar navbar-expand-lg top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent ">
                <div className="container ">
                    <a className="navbar-brand  text-white " href="" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom" target="_blank">
                        <i className="bi bi-boxes me-2"></i>
                        Soft UI Design System
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navigation">
                        <ul className="navbar-nav navbar-nav-hover mx-auto">
                            {isLogin ?<>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/home"}>
                                        <i className="bi bi-house me-2"></i>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/profile"}>
                                        <i className="bi bi-person me-2"></i>
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/newPost"}>
                                        <i className="bi bi-file-earmark-plus me-2"></i>
                                        New Post
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/allPost"}>
                                    <i className="bi bi-grid me-2"></i>
                                        All Post
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/search"}>
                                        <i className="bi bi-search me-2"></i>
                                        Search
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/settings"}>
                                        <i className="bi bi-gear me-2"></i>
                                        Settings
                                    </Link>
                                </li>
                                <li className="nav-item px-3">
                                    <a className="nav-link text-white" onClick={logout}>
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </a>
                                </li>
                            </>
                            :<>
                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/signup"}>
                                        <i className="bi bi-person-plus me-2"></i>
                                        SignUp
                                    </Link>
                                </li>

                                

                                <li className="nav-item px-3">
                                    <Link className="nav-link text-white" href={"/signin"}>
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        SignIn
                                    </Link>
                                </li>
                            </> }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}