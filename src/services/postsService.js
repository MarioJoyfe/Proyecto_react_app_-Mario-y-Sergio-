const API_URL = "https://jsonplaceholder.typicode.com/posts"

export async function getPosts() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Error al obtener posts")
  return res.json()
}

export async function createPost(post) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })

  if (!res.ok) throw new Error("Error al crear post")
  return res.json()
}
