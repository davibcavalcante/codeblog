import { AsideProvider } from "../contexts/AsideContext";
import { UserProvider } from "../contexts/UserContext";

import Aside from "../components/Aside";
import Header from "../components/Header"
import PostForm from "../components/Home/PostForm";

const Home = () => {

    return (
        <AsideProvider>
            <UserProvider>
                <Header />
                <Aside />
                <section className="bg-black w-full h-home p-4 flex flex-col gap-12 lg:w-9/12 lg:absolute lg:right-0 lg:top-20 lg:overflow-y-auto 2xl:w-10/12">
                    <PostForm/>
                </section>
            </UserProvider>
        </AsideProvider>
    );
};

export default Home;