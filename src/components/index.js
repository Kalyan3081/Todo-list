import React, { useState, useEffect } from 'react'
import "./style.css"

// get the localStorage data back
// const getLocalData = () => {
//     const lists = localStorage.getItem("mytodolist");

//     if (lists) {
//         return JSON.parse(lists);
//     } else {
//         return [];
//     }
// };
const Index = () => {
    const [inputdata, setInputdata] = useState('')
    const [itemslist, setItemslist] = useState([])
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    // add item function

    const additem = () => {
        if (!inputdata) {
            alert("plz list out the todos")
        } else if (inputdata && toggleButton) {
            setItemslist(
                itemslist.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );
            setInputdata("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const mynewdatalist = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItemslist([...itemslist, mynewdatalist])
            setInputdata('')
        }
    }
    //edit the items
    const editItem = (index) => {
        const item_todo_edited = itemslist.find((curElem) => {
            return curElem.id === index;
        });
        setInputdata(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };


    // DELETE FUNCTION
    const deleteItem = (Index) => {
        const updatedItems = itemslist.filter((curElem) => {
            return curElem.id !== Index
        })
        setItemslist(updatedItems)
    }

    // REMOVE ALL FUNCTION
    const removeAll = () => {
        setItemslist([])
    }

    // adding localStorage
    // useEffect(() => {
    //     localStorage.setItemslist("mytodolist", JSON.stringify(itemslist));
    // }, [itemslist]);


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todo.svg' alt='todologo'></img>
                        <figcaption>
                            Add your list here ✌️
                        </figcaption>
                        <div className='additems'>
                            <input type='text' placeholder='✍️ Add items' className='form-control'
                                value={inputdata} onChange={(e) => setInputdata(e.target.value)} />
                            {toggleButton ? (
                                <i className="far fa-edit add-btn" onClick={additem}></i>
                            ) : (
                                <i className="fa fa-plus add-btn" onClick={additem}></i>
                            )}
                        </div>

                        {/* SHOW ITEMS */}

                        <div className='showItems'>
                            {itemslist.map((curElem) => {
                                return (
                                    <div className='eachItem' key='id'>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)} ></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        {/* remove all button */}

                        <div className='showItems'>
                            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Check all</span></button>
                        </div>
                    </figure>
                </div >
            </div >
        </>
    )
}

export default Index
