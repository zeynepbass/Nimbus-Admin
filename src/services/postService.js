import fetcher from "@/lib/fetcher"

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL

export const postService = {
  getAll: () => fetcher(BASE_URI),
}
