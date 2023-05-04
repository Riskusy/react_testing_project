import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes, privateRoutes } from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
// Передаем доступ к переменной isAuth из App
    // теперь мы можем передавать все поля которые мы получаем
    // из value
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if(isLoading) {
        return <Loader/>
    }

    return (
        // В зависимости от значения isAuth будем отрисовать или нет
        // то что создали ниже
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/posts"/> }/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/login"/> }/>
            </Routes>


    // <Routes>
        //     {/*/!* Пути в браузере *!/*/}
        //     {/*<Route path="/about" element={<About/>}/>*/}
        //     {/*<Route path="/posts" element={<Posts/>}/>*/}
        //     {/*/!*При нажатие открыть пост открывается именно тот пост,*!/*/}
        //     {/*/!*который указан в id*!/*/}
        //     {/*<Route path="/posts/:id" element={<PostIdPage/>}/>*/}
        //     {/*/!*Можно указать на страницу с ошибкой*!/*/}
        //     {/*/!*<Route path="error" element={<Error/>}/>*!/*/}
        //     {/*<Route path="*" element={<Navigate replace to="/posts"/> }/>*/}
        //
        //     {/*Сделаем через мар по страничный переход функция описана*/}
        //     {/*в папке router file index.js*/}
        //     {/*    {routes.map(route =>*/}
        //     {/*        <Route*/}
        //     {/*            element={route.element}*/}
        //     {/*            path={route.path}*/}
        //     {/*            />*/}
        //     {/*    )}*/}
        //
        //     {/*Запускаем массив для прайвет*/}
        //     {privateRoutes.map(route =>
        //         <Route
        //             element={route.element}
        //             path={route.path}
        //         />
        //     )}
        //     {/*Запускаем массив для не залогининых*/}
        //     {publicRoutes.map(route =>
        //         <Route
        //             element={route.element}
        //             path={route.path}
        //         />
        //     )}
        //
        //     <Route path="*" element={<Navigate replace to="/posts"/> }/>
        // </Routes>
    );
};

export default AppRouter;