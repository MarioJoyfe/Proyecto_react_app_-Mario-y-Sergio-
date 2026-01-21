import { useEffect, useState } from "react"
import { getPosts, createPost } from "../services/postsService"

export default function Admin() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data.slice(0, 5))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !body) return

    const newPost = await createPost({
      title,
      body,
      userId: 1,
    })

    setPosts([newPost, ...posts])
    setTitle("")
    setBody("")
  }

  if (loading) {
    return <p className="p-6">Cargando posts...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Administración
      </h1>

      {/* Formulario de creación */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-100 p-4 rounded"
      >
        <h2 className="text-xl font-semibold mb-3">
          Crear nuevo post
        </h2>

        <input
          type="text"
          placeholder="Título"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Contenido"
          className="border p-2 w-full mb-3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear post
        </button>
      </form>

      {/* Listado de posts */}
      <h2 className="text-xl font-semibold mb-4">
        Posts existentes
      </h2>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border p-4 rounded bg-white"
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
