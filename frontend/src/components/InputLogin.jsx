const InputLogin = ({ type, placeholder, name }) => {
    return (
        <section className="relative">
            <input type={type} name={name} autoComplete={ type === 'email' ? 'on' : 'off'} className="bg-transparent text-white w-full py-2 px-4 border-2 border-white rounded-lg"/>
            <span className="text-white text-lg font-poppins absolute top-1/4 left-4 duration-500">{placeholder}</span>
        </section>
        
    );
}

export default InputLogin;