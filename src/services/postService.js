import fetcher from "@/lib/fetcher";
import { API_URL } from "@/constant/api";
export default function postService() {
  return {
    getAll: () => fetcher(API_URL.POSTS),
    getById: (id) => fetcher(`${API_URL.POSTS}/${id}`),
    getDelete: (id) => fetcher(`${API_URL.POSTS}/${id}`),
  };
}
