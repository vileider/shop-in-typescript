import '../styles/styles.css';
import React, { useState } from 'react';
import { AddItem } from './modBarSeverCommunication/AddItem'
import { AddDinner } from './modBarSeverCommunication/AddDinner'
export const ModBar = function () {
    const [clickedMenu, setclickedMenu] = useState('clickedMenuOff')

    const menuNameClassName = (newClassName) => {
        return (
            clickedMenu === 'clickedMenuOff' ? setclickedMenu(newClassName)
                : clickedMenu === newClassName ? setclickedMenu('clickedMenuOff')
                    : clickedMenu !== 'clickedMenuOff' ? setclickedMenu(newClassName)
                        : null)
    }

    const itemButton = (
        <div className='itemButton' onClick={() => {
            menuNameClassName('itemMenu')
        }}>
            ADD ITEM</div>
    )
    const dinnerButton = (
        <div className='dinnerButton' onClick={() => {
            menuNameClassName('dinnerMenu')
        }}>
            ADD DINNER</div>
    )
    return (<div className='settingsMenu'>
        <div className='buttonBar' >
            {itemButton}{dinnerButton}
        </div>
        <div className={clickedMenu}>
            {clickedMenu === 'itemMenu' && <AddItem />}
            {clickedMenu === 'dinnerMenu' && <AddDinner />}
        </div>
    </div >)
}