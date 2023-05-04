import {useEffect, useRef} from "react";

export const useObserver = (
    ref,
   canLoad,
    isLoading,
    callback) =>{
    const observer = useRef();
    //делаем обсервер для добавление постов вниз страницы(подгружать при скорее вниз)
    // позволяет Intersection_Observer_API
    useEffect(() => {
        if(isLoading) return;
        //Если обсервер уже создан если в поле каррент что-то находится
        //тогда мы должны отключить наблюдение за всеми элементами, за котоыми
        //наблюдает объект в текущий момент
        if(observer.current) observer.current.disconnect();
        //Пример из intersection_observer_Api
        let cb = function(entries, observer) {
            //Отрабатывать в том случае, если номер текущий страницы < общее кол-во
            if(entries[0].isIntersecting && canLoad){
               callback()

            }
            // Каждый раз когда будет появлся обсервер будет срабатывать callback
        };
        observer.current = new IntersectionObserver(cb);
        // Указываем за каким элементом будем наблюдать
        observer.current.observe(ref.current)
    },[isLoading])
}