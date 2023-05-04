import React from 'react';
import Classes from './MyModal.module.css';


const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [Classes.myModal]

    if(visible){
        rootClasses.push(Classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={Classes.myModalContent} onClick={(e) => e.stopPropagation()} >
                {children}
            </div>

        </div>
    );
};

export default MyModal;