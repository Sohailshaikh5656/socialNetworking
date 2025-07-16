"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "@/store/slice/allSlicer"
import Link from "next/link"
import { encrypt } from "../assets/encription"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const allUsers = useSelector((state) => state.allSlicer.allUsers)
  const status = useSelector((state) => state.allSlicer.status)
  const error = useSelector((state) => state.allSlicer.error)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      setLoading(false)
    } else if (status === 'failed') {
      setLoading(false)
      console.error("Failed to fetch users:", error)
    }
  }, [status, error])

  // Initialize filteredUsers as empty array
  let filteredUsers = []
  
  // Check if allUsers exists and is an array before filtering
  if (Array.isArray(allUsers) && allUsers.length > 0) {
    filteredUsers = allUsers.filter(user => 
      user.username && user.username.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">🔍 Search by Username</h2>

      {/* Search Input */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loading State */}
      {loading && <div className="text-center">Loading users...</div>}

      {/* Search Results */}
      <ul className="list-group">
        {!loading && Array.isArray(filteredUsers) && filteredUsers.map(user => (
          <li key={user.username} className="list-group-item d-flex align-items-center search-result">
            <Link href={`/otherProfile/${user.id}`}><Image
              src={`http://localhost:3300/uploads/${user.avtar}`}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-circle me-3"
              />
              </Link>
            <div>
              <div className="fw-bold">@{user.username}</div>
              <small className="text-muted">{user.name}</small>
            </div>
          </li>
        ))}
        {!loading && filteredUsers.length === 0 && (
          <li className="list-group-item text-center text-muted">No users found</li>
        )}
      </ul>
    </div>
  )
}
