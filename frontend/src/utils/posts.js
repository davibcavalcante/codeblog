import { authApiFetch } from "../axios/config";
import { getUser } from "./auth";

export const sendPost = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem('user_id'));

    const formData = {
        title: e.target.title.value,
        content: e.target.content.value,
        imageUrl: 'https://github.com/davibcavalcante.png'
    };

    const results = await authApiFetch.post(`/api/post/${userId}/create`, formData);
    console.log(results.data);
}

export const getUserPosts = async () => {
    const userId = JSON.parse(localStorage.getItem('user_id'));

    const userData = await getUser();
    const postsResults = await authApiFetch.get(`/api/post/${userId}/posts`)
    const postsData = await postsResults.data

    return {userData, postsData}
}