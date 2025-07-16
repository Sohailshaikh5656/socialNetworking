import Link from "next/link"
export default function Footer() {
    return (
        <footer className="bg-black text-white py-4 mt-auto">
            <div className="container text-center">
                <p className="mb-1">© 2024 Social Media App. All rights reserved.</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link href={"/home"} className="text-white text-decoration-none">About</Link>
                    <Link href={"/profile"} className="text-white text-decoration-none">Privacy Policy</Link>
                    <Link href={"/newPost"} className="text-white text-decoration-none">Terms of Service</Link>
                    <Link href={"/allPost"} className="text-white text-decoration-none">Contact</Link>
                </div>
            </div>
        </footer>
    )
}
