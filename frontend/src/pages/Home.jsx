import { DiamondPlus, X } from "lucide-react";
import { AsideProvider } from "../utils/AsideContext";
import { sendPost } from "../utils/posts";
import Aside from "../components/Aside";
import Header from "../components/Header"
import { useState } from "react";

const Home = () => {
    const [isOpenInputPost, setIsOpenInputPost] = useState(false);

    const togglePostArea = () => {
        setIsOpenInputPost(!isOpenInputPost);
    };


    return (
        <AsideProvider>
            <Header />
            <Aside />
            <section className="bg-black w-full h-home p-4 flex flex-col gap-12 lg:w-9/12 lg:absolute lg:right-0 lg:top-20 lg:overflow-y-auto 2xl:w-10/12">
                <section className={`${isOpenInputPost ? 'flex' : 'hidden'} flex-col gap-4 sm:block`}>
                    <form className="flex flex-col gap-4" onSubmit={sendPost}>
                        <section className="flex items-center justify-end gap-4">
                            <button className={`bg-white text-light font-poppins font-semibold w-fit p-2 rounded-md ${!isOpenInputPost ? 'hidden' : 'block'} sm:hidden`} onClick={togglePostArea} type="button">
                                Cancelar
                            </button>
                            <button className="bg-light text-white font-poppins w-fit p-2 rounded-md">Publicar</button>
                        </section>
                        <input type="text" placeholder="Digite o título do seu post" className="bg-transparent text-white border-b-2 border-white p-2 w-full shadow-xl outline-none" name="title" />
                        <textarea type="text" placeholder="Digite o conteúdo do seu post" className="bg-transparent text-white border-2 border-white p-2 w-full min-h-24 rounded-md shadow-xl outline-none" name="content" />
                    </form>
                </section>
                <section>
                    <section id="fy-section"></section>
                    <section className="">
                        <button className={`bg-light text-white w-fit p-2 rounded-full ${isOpenInputPost ? 'hidden' : 'flex'} items-center gap-2 sm:hidden`} onClick={togglePostArea}>
                            <DiamondPlus />
                        </button>
                    </section>
                </section>
            </section>
        </AsideProvider>
    );
};

export default Home;