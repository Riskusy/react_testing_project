
import React from 'react';
import {getPagesArray} from "../../utils/pages";

    {/*// Создаем элементы страниц для переключения по страницам*/}

const Pagination = ({totalPage, page, changePage}) => {
    // Создаем цикл от 1 до 10 и кнопки(при нажатие, будут менятся страницы)
    // Перенесен в pages.js
    let pagesArray = getPagesArray(totalPage);
    return (
    <div className="page__wrapper">
        {pagesArray.map(p =>
            <span
                onClick={()=>changePage(p)} // клик происходит по странице
                key={p} //Созадаем обязательный ключ(всегда будет уникальный)
                className={page === p ? "page page__current" : "page"}>
                            {p}
                        </span>
        )}
    </div>
    );
};

export default Pagination;