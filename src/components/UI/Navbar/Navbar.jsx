import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    // Что бы реализовать выход, необходимо снова воспользоватся
    // Хуком useContext
    const { isAuth, setIsAuth } = useContext(AuthContext);

    //Когда мы выходим необходимо запись в localStorage удалять
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            {/*Создаем кнопку выхода на авторизацию*/}
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                {/*// ссылки на страницы*/}
                <Link to="/about">About page</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;