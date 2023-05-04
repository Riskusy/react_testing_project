import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    // Меняем состояние для маршрута пользователя
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
      event.preventDefault();
      setIsAuth(true);
      // В момент авторизации, в момент логина необходимо сохранять в
        // localStorage
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"/>
                <MyInput type="password" placeholder="Введите пароль"/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;