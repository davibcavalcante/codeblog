import { UserProvider } from "../contexts/UserContext";
import LoginRegister from "../components/LoginRegister";

const Login = () => {
    return (
        <UserProvider>
            <LoginRegister action={'login'} />
        </UserProvider>
    );
}

export default Login;