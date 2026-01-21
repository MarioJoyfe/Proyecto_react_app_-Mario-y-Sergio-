const API_URL = "https://jsonplaceholder.typicode.com/posts"

export async function getPosts() {
  const res = await fetch(API_URL)
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
  return res.json()
}

export async function updatePost(id, post) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
  return res.json()
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  return res
}
