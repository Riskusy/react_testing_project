import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";



function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    // Создаем useEffect для понимания авторизован пользователь или нет
    useEffect(()=>{
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false)
    }, [])

    return (
        // Указываем какие данные будут хравится в
        // глобальном хранилище
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
    }

export default App;
