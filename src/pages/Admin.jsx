import { useEffect, useState } from "react"
import {
  getPosts,
  deletePost,
  updatePost,
} from "../services/postsService"

export default function Admin() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")

  useEffect(() => {
    getPosts().then(data => setPosts(data.slice(0, 10)))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este post?")) return
    await deletePost(id)
    setPosts(posts.filter(post => post.id !== id))
  }

  const startEdit = (post) => {
    setEditingPost(post.id)
    setEditTitle(post.title)
    setEditBody(post.body)
  }

  const saveEdit = async (id) => {
    const updatedPost = {
      title: editTitle,
      body: editBody,
      userId: 1,
    }

    await updatePost(id, updatedPost)

    setPosts(
      posts.map(post =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    )

    setEditingPost(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Administración
      </h1>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded p-4">
            {editingPost === post.id ? (
              <>
                <input
                  className="border p-2 w-full mb-2"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  className="border p-2 w-full mb-2"
                  value={editBody}
                  onChange={e => setEditBody(e.target.value)}
                />
                <button
                  onClick={() => saveEdit(post.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {post.body}
                </p>
                <button
                  onClick={() => startEdit(post)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
