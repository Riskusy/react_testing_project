import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    // мемомизация позволяет следить за изменениями в зависимостях
    const sortedPosts = useMemo(() => {
        console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТОВ')
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;

    }, [sort, posts])
    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    // // инициализация сортировки
    // const [selectedSort, setSelectedSort] = useState('');
    //
    // // инициализация поиска
    // const [searchQuery, setSearchQuery] = useState('');
    // улучшенная сортировка 2
    // function getSortedPosts() {
    //     //     console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТОВ')
    //     //     if(selectedSort) {
    //     //         return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    //     //     }
    //     //     return posts;
    //     // }

    // // функция сортировки
    // const sortPosts = (sort) => {
    //     setSelectedSort(sort)
    //     // мутируем копию массива, а не на прямую(можно так делать)
    //     // setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    // }

    // улучшеная сортировка
    // const sortedPosts = [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))

    // улучшенная сортировка 2
    //const sortedPosts = getSortedPosts()



    // отсортированный поиск черзе мемонизацию
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query))
    },[query, sortedPosts])
    return sortedAndSearchedPosts;
}