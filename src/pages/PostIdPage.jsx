import React, {useEffect, useState} from 'react';
// useParams позволяет выцеплять параметры из url и
// отправить запрос на сервер
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    // Создаем состояние, в которое нам вернет, то что придет с сервера
    const [posts, setPosts] = useState({});
    // Sоздаем еще одно состояние, которое возвращает с сервера comments
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async(id)=> {
        const response = await PostService.getById(id)
        // Помещяем в setPost ответ от сервера
        setPosts(response.data);
    })
    // Создаем еще одно состояние для получение комментариев
    const [fetchComments, isComLoading, comError] = useFetching(async(id)=> {
        const response = await PostService.getCommentsByPostId(id)
        // Помещяем в setPost ответ от сервера
        setComments(response.data);
    })
    // Создаем useEffect, параметром первого будет получение данных с сервера
    // Благодаря созданной функий useFetching
    useEffect(()=>{
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {/*открываем страницу с id на которую указали*/}
            <h1>Вы открыли странцу поста c ID={params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{posts.id}.{posts.title}</div>
            }
            <div>
                Комментарии
            </div>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: "15px"}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>)}
                </div>
            }
        </div>
    );
};

export default PostIdPage;