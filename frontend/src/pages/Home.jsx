import { useState } from "react";
import { DiamondPlus, FolderClosed, Pen, User } from "lucide-react";
import { AsideProvider } from "../contexts/AsideContext";
import { UserProvider } from "../contexts/UserContext";
import { sendPost } from "../utils/posts";
import Aside from "../components/Aside";
import Header from "../components/Header"

const Home = () => {
    const [isOpenInputPost, setIsOpenInputPost] = useState(false);

    const togglePostArea = () => {
        setIsOpenInputPost(!isOpenInputPost);
    };


    return (
        <AsideProvider>
            <UserProvider>
                <Header />
                <Aside />
                <section className="bg-black w-full h-home p-4 flex flex-col gap-12 lg:w-9/12 lg:absolute lg:right-0 lg:top-20 lg:overflow-y-auto 2xl:w-10/12">
                    <section className={`${isOpenInputPost ? 'flex' : 'hidden'} flex-col gap-4 sm:block`}>
                        <form className="flex flex-col gap-4" onSubmit={sendPost}>
                            <section className="flex items-center justify-end gap-4 sm:order-2">
                                <button className={`bg-white text-light font-poppins font-semibold w-1/2 p-1 rounded-md ${!isOpenInputPost ? 'hidden' : 'block'} sm:hidden`} onClick={togglePostArea} type="button">
                                    Cancelar
                                </button>
                                <button className="bg-light text-white font-poppins w-1/2 p-1 rounded-md flex items-center gap-2 sm:w-fit sm:p-2"><Pen /> Publicar</button>
                            </section>
                            <section className="flex flex-col gap-4 w-full sm:order-1">
                                <section className="flex gap-4">
                                    <input type="text" placeholder="Digite o título do seu post" className="bg-transparent text-white p-2 border-2 border-white rounded-md shadow-xl outline-none flex-1" name="title" />
                                    <label className='bg-light text-white font-poppins p-2 w-fit rounded-md shadow-sm shadow-white cursor-pointer flex gap-2 items-center'>
                                        <FolderClosed /> <span className="hidden sm:block">Imagem</span>
                                        <input type="file" name="image" className='hidden' accept="image/*" multiple />
                                    </label>
                                </section>
                                <textarea type="text" placeholder="Digite o conteúdo do seu post" className="bg-transparent text-white border-2 border-white p-2 w-full min-h-24 rounded-md shadow-xl outline-none" name="content" />
                            </section>
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
            </UserProvider>
        </AsideProvider>
    );
};

export default Home;