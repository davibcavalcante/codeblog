import { Outlet, useLocation } from 'react-router-dom';
import { AsideProvider } from "../utils/AsideContext";
import Header from "../components/Header";
import Aside from "../components/Aside";
import NavProfile from "../components/Profile/ProfileNav";

const Profile = () => {
    const location = useLocation();

    return (
        <AsideProvider>
            <Header />
            <Aside />
            <NavProfile pathname={location.pathname}/>
            <Outlet />
        </AsideProvider>
    );
}

export default Profile;