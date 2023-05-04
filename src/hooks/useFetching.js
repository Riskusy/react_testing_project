import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Обработка ассихронного запроса
    // 2 способ добавлянения страниц и новых постов в async((добавить) ...args)
    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            // и для 2 способа передаем их в callback(...args)
            await callback(...args)
        }catch (e) {
            setError(e.message);
        }finally {
            setIsLoading(false)
        }
    }
    // Возвращаем массив из трех элементов, дабы произвести деструктуризацию
        return [fetching, isLoading, error]
}