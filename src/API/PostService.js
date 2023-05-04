import axios from "axios";

export default class PostService {
    // Указываем лимит, сколько мы хотим видеть на странице ответов
    static async getAll(limit = 10, page = 1) {
        // При любом запросе на сервер, отлавливать ошибку
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response;

        }
        // Принимаем параметром id post
    static async getById(id) {
        // При любом запросе на сервер, отлавливать ошибку
        // Просто добавляем в запросе id
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response;
    }

    // Реализуем запрос на комментарий из постов
    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
    }
