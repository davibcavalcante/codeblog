import LoginRegister from "../components/LoginRegister";

const Register = () => {
    return (
        <UserProvider>
            <LoginRegister action={'register'} />
        </UserProvider>
    );
}

export default Register;