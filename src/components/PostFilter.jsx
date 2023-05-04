import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
    {/*Сортировка*/}
    {/*<div>*/}

    {/*    /!*ВЫПАДАЮЩИЙ СПИСОК*!/*/}
    {/*    <select>*/}
    {/*        <option value="value1">По названию</option>*/}
    {/*        <option value="value1">По описанию</option>*/}
    {/*    </select>*/}
    {/*</div>*/}
    return (
    <div>
        {/*Поисковая система*/}
        <MyInput
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="Поиск..."
        />
        {/*Более улучшенная сортировка MySelect.jsx*/}
        <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Сортировка"
            options={[
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]}
        />
    </div>
    );
};

export default PostFilter;