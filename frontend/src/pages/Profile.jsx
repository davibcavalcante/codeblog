import Header from "../components/Header";
import Aside from "../components/Aside";
import { AsideProvider } from "../utils/AsideContext";

const Profile = () => {
    return (
        <AsideProvider>
            <Header/>
            <Aside/>
        </AsideProvider>
    );
}

export default Profile;