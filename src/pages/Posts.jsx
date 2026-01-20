import { useEffect, useState } from "react"
import { getPosts, createPost } from "../services/postsService"

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    getPosts().then(data => setPosts(data.slice(0, 5)))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = await createPost({ title, body, userId: 1 })
    setPosts([newPost, ...posts])
    setTitle("")
    setBody("")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts (API)</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Contenido"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Crear post
        </button>
      </form>

      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id} className="border p-3 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
