import { useEffect, useState } from "react"
import { getPosts } from "../services/postsService"

export default function Admin() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(data => setPosts(data.slice(0, 10)))
  }, [])

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded p-4 flex justify-between">
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.body}</p>
            </div>

            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
