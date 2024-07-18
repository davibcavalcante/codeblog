import { authApiFetch, authApiImage } from "../axios/config";
import { getUser } from "./user";

export const sendPost = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem('user_id'));

    const post = {
        title: e.target.title.value,
        content: e.target.content.value,
    }

    const images = e.target.image.files;

    const formData = new FormData();
    formData.append("post", JSON.stringify(post));
    
    for (let image of images) {
        formData.append("photoUrl", image);
    };

    await authApiImage.post(`/api/post/${userId}`, formData);
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