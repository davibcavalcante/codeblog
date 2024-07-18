import { authApiFetch } from "../axios/config";
import { getUser } from "./user";

export const sendPost = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem('user_id'));

    const formData = {
        title: e.target.title.value,
        content: e.target.content.value,
        imageUrl: e.target.image.files[0]
    };

    const results = await authApiFetch.post(`/api/post/${userId}`, formData);
    console.log(results.data);
}

export const getUserPosts = async () => {
    const userId = JSON.parse(localStorage.getItem('user_id'));

    try {
        const userData = await getUser();
        const postsResults = await authApiFetch.get(`/api/post/user/${userId}`);
        const postsData = await postsResults.data;

        return { postsData, userData };
    } catch (err) {
        console.log("err")
    }
}