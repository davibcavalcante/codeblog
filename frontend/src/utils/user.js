import { authApiFetch, authApiImage } from "../axios/config";

export const getUser = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        const results = await authApiFetch.get(`/api/profiles/${userId}`);
        return results.data;
    } catch (err) {
        console.log(err);
    }
};

export const newProfileImage = async (image) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user_id'));

        const formData = new FormData();
        formData.append('photoUrl', image)

        const results = await authApiImage.post(`/api/profiles/${userId}/image`, formData);

        if (results.status === 200) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}