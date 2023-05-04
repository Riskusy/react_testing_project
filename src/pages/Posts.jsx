import React, {useEffect, useRef, useState} from 'react';
import PostList from "./../components/PostList";
import PostForm from "./../components/PostForm";
import PostFilter from "./../components/PostFilter";
import MyModal from "./../components/UI/MyModal/MyModal";
import MyButton from "./../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "./../API/PostService";
import Loader from "./../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../components/utils/pages";
import Pagination from "./../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";



function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:'', query:''})

    // Отвечает зато, видим мы модальное окно или нет
    const [modal, setModal] = useState(false);

    // Создаем общее состояние помещения всех постов
    const [totalPage, setTotalPage] = useState(0);

    // Создаем состояние для лимит постов
    const [limit, setLimit] = useState(10);

    // Создаем состояние для хранения страниц
    const [page, setPage] = useState(1);

    // Перенесеная сортировка из usePosts.js
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    // получаем ссылку на дом элемент
    const lastElement = useRef();
    console.log(lastElement)

    // // создаем reference для observer и перенесли его в useObsrver.js
    // const observer = useRef();



    // Создаем задержку времени для пользователя(крутилку), что загрузка идет!
    // Мы перенесли его в useFetching.js
    // const [isPostsLoading, setIsPostsLoading] = useState(false);

    // Деструктуризируем то, что вернул useFetching
    //2 способ добавить изменения страниц с новыми постами
    // в useFetching(async((добавить) limit, page) =>...
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page)=>{
        // Передаем параметы в getAll(лимиты постов, и какая страница)
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        // Обращаемся к header и достаем от туда сколько значений у него есть
        //Подсчетаем общее количество страниц
        const totalCount = response.headers['x-total-count']
        setTotalPage(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPage, isPostsLoading, ()=>{
        setPage(page + 1);
    })

    // Юз эффект не обходим для жизненого цикла
    // (mount(монтирование в DOM), update(обновление компонента(активная стадия),
    // unmount(размонтирование))
    useEffect(() => {
        // вызывает запрос fetchPosts(), что бы сразу при загрузке стрницы
        // посты подгружались на страницу
        // 2 спобов добавить изменения страниц с новыми постами
        // в fetchPosts((добавить) limit, page)
        fetchPosts(limit, page)
        // deps если оставить пустым, то он отработает единожды
        // 1 способ добавить изменения страниц с новыми постами в deps[page]
    }, [page, limit])

    // функция для создания нового поста
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    // функция для удаления поста
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    // Создаем функцию котрая будет обрабатывать изменение клика страницы
    const changePage = (page) => {
        setPage(page)
        //2 способ добавить измениня страниц с новыми постами
        // fetchPosts(limit, page)
        //Создаем фетч запрос, который при изменение страницы показывает другие посты
        // fetchPosts(); если добавляет page в useEffect(зависимости), то от сюда удаляем!
    }

    // Делаем запрос на сервер, что бы взять 100 постов
    // async function fetchPosts() {
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    //    setPosts(response.data)
    // }

    // Запрос на сервер через getAll() из файла PostService.js
    // async function fetchPosts() {
    //         setIsPostsLoading(true);
    //         setTimeout(async ()=>{
    //             // Этот функционал перенесли в const [] = useFetching
    //             // const posts = await PostService.getAll();
    //             // setPosts(posts)
    //             // setIsPostsLoading(false);
    //             },250)
    // }

    return (
        <div className="App">
            <MyButton onClick={fetchPosts} >GET POSTS</MyButton>
            {/*Создаем кнопку меняющая модальное окно*/}
            <MyButton style={{marginTop: "30px"}} onClick={()=>setModal(true)}>
                Создать пользователя
            </MyButton>
            {/*Модальное окно*/}
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit((value))}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {/*Производим проверку, если какая-то ошибка или нет*/}
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }

            {/*/!*Условная отрисовка, когда не одного поста нету*!/*/}
            {/*{sortedAndSearchedPosts.length*/}
            {/*    ?*/}
            {/*    <PostList remove={removePost} posts={sortedAndSearchedPosts} title="список постов 1"/>*/}
            {/*    :*/}
            {/*    <h1 style={{textAlign: "center"}}>*/}
            {/*        Посты не найдены!*/}
            {/*    </h1>*/}
            {/*}*/}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>

            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPage={totalPage}
            />
        </div>
    );
}

export default Posts;
