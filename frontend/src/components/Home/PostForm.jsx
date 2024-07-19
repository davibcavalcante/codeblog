import { useEffect, useState } from "react";
import { AlertCircle, DiamondPlus, Edit, FolderClosed, Pen, X } from "lucide-react";
import { postPost } from "../../api/posts";

const PostForm = () => {
    const [isOpenInputPost, setIsOpenInputPost] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [alert, setAlert] = useState(false);

    const maxFiles = 4;

    const togglePostArea = () => {
        setIsOpenInputPost(!isOpenInputPost);
    };

    const setNewImagePreview = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > maxFiles) {
            return setAlert(true);
        }

        setAlert(false);

        const newImagePreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file
        }));

        

        imagesPreview.forEach(image => URL.revokeObjectURL(image.url));

        setImagesPreview(newImagePreviews);
    };

    const setPostData = async (e) => {
        e.preventDefault();

        const post = {
            title: e.target.title.value,
            content: e.target.content.value,
        }

        const formData = new FormData();
        formData.append("post", JSON.stringify(post));

        for (let image of imagesPreview) {
            formData.append("photoUrl", image.file);
        };

        const isPublished = await postPost(formData);

        if (isPublished) {
            e.target.reset();
            e.target.title.focus();
            setImagesPreview([]);
        }
    }

    const deleteImagePreview = (indexToRemove) => {
        URL.revokeObjectURL(imagesPreview[indexToRemove].url);

        setImagesPreview(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(indexToRemove, 1);
            return updatedImages;
        });
    }

    useEffect(() => {
        return () => {
            imagesPreview.forEach(image => URL.revokeObjectURL(image.url));
        };
    }, []);

    return (
        <section>
            <section className={`${isOpenInputPost ? 'flex' : 'hidden'} bg-alt border border-opaque p-4 rounded-xl flex-col gap-4 sm:block md:max-w-screen-md md:m-auto`}>
                <form className="flex flex-col gap-4" onSubmit={setPostData}>
                    <section className="flex items-center justify-end gap-4 sm:order-3">
                        <button className={`bg-white text-light font-poppins font-semibold w-1/2 p-1 rounded-md ${!isOpenInputPost ? 'hidden' : 'block'} sm:hidden`} onClick={togglePostArea} type="button">
                            Cancelar
                        </button>
                        <button className="bg-light text-white font-poppins w-1/2 p-1 rounded-md flex items-center gap-2 sm:w-fit sm:p-2"><Pen /> Publicar</button>
                    </section>
                    <section className="flex flex-col gap-4 w-full sm:order-1">
                        <section className="flex gap-4">
                            <input type="text" placeholder="Digite o título do seu post" className="bg-transparent text-white p-2 border-2 border-white rounded-md shadow-xl outline-none flex-1" name="title" />
                            <label className='bg-light text-white font-poppins p-2 w-fit rounded-md shadow-sm cursor-pointer flex gap-2 items-center'>
                                {imagesPreview.length > 0 ? <Edit /> : <FolderClosed />} <span className="hidden sm:block">Imagem</span>
                                <input type="file" name="image" className='hidden' accept="image/*" multiple onChange={setNewImagePreview} />
                            </label>
                        </section>
                        <textarea type="text" placeholder="Digite o conteúdo do seu post" className="bg-transparent text-white border-2 border-white p-2 w-full min-h-24 rounded-md shadow-xl outline-none" name="content" />
                    </section>
                    <section className="h-auto flex flex-col gap-4 sm:order-2">
                        <section className={`${alert ? 'block' : 'hidden'} bg-black text-alert font-poppins w-fit max-w-full py-2 px-3 rounded-xl`}>
                            <p className="flex items-center gap-2"><AlertCircle /> Você pode adicionar no máximo 4 imagens.</p>
                        </section>
                        <section className="flex items-center gap-2 overflow-x-auto">
                            {imagesPreview && imagesPreview.map((image, index) =>
                                <div className="relative" key={index}>
                                    <X className="bg-black bg-opacity-75 text-white aspect-square p-1 rounded-full absolute top-2 right-2" onClick={() => deleteImagePreview(index)} />
                                    <img src={image.url} alt="" className="w-24 h-24 object-cover rounded-lg shadow-xl" />
                                </div>
                            )}
                        </section>
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
    );
};

export default PostForm;