import { authApiFetch, authApiImage } from "../axios/config";
import { getUser } from "./user";

export const sendPost = async (formData) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        const results = await authApiImage.post(`/api/post/${userId}`, formData);
        if (results.status === 200) return true
    } catch (err) {
        console.log(err)
        return false
    }
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