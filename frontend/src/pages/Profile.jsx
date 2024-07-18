import { Outlet, useLocation } from 'react-router-dom';
import { AsideProvider } from "../contexts/AsideContext";
import { UserProvider } from '../contexts/UserContext';

import Header from "../components/Header";
import Aside from "../components/Aside";
import NavProfile from "../components/Profile/ProfileNav";

const Profile = () => {
    const location = useLocation();

    return (
        <AsideProvider>
            <UserProvider>
                <Header />
                <Aside />
                <NavProfile pathname={location.pathname} />
                <Outlet />
            </UserProvider>
        </AsideProvider>
    );
}

export default Profile;