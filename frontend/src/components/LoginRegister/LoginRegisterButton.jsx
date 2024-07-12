const LoginRegisterButton = ({ children, className, type, funct }) => {
    return (
        <button className={className} onClick={funct} type={type} >{children}</button>
    );
}

export default LoginRegisterButton;