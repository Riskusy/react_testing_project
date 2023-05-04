import React from 'react';
import {useNavigate} from 'react-router-dom';
import './../styles/App.css'
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    // Осуществление перехода на др. стр. без Link
    const router = useNavigate()
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
                        Открыть
                    </MyButton>
                    <MyButton onClick={() => props.remove(props.post)}>
                        Удалить
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;