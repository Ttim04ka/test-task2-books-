import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, setCurrentBook } from './reducers/app-reducer';
import AllBooks from './components/AllBooks';
import Preloader from './components/Preloader';
import CurrentBook from './components/CurrentBook';
import { AppState } from './redux';


const App=()=> {
  
  let dispatch=useDispatch();
  let books=useSelector(state=>state.appReducer.books);//масиив со всеми книгами по запросу
  let isFetching=useSelector(state=>state.appReducer.preloader);//состояние прелоадера
  let searchItem=useSelector(state=>state.appReducer.searchItem);//данные инпута
  let totalItems=useSelector(state=>state.appReducer.count);//счетчик для пагинации
  let openCurrentBook=useSelector(state=>state.appReducer.currentBook?.opened);//проверка состояния нажатия на определенную книгу
  let [dataFilter,setDataFilter]=useState('relevance');//дата(для фильтрации)
  let [categoriesFilter,setCategoriesFilter]=useState('');//Категории(для фильтрации)


  let getLength=()=>{
    let inputValue=document.querySelector('#search_input')?.value;
    let length;
    if(inputValue!==searchItem || books===null ){
      length=0;
    }else{
      length=(books?.length || 0)
    }
    return length;
  }//получение длины для пагинации


  
  useEffect(()=>{
    console.log('update')
  })//проверка перерисовки

  console.log(books)
  let  findBooksToKey=(event)=>{
    document.addEventListener('keydown',(e)=>{
      if(e.keyCode===13){
        e.stopPropagation();
        let inputValue=document.querySelector('#search_input');
        event.target.blur();
        dispatch(getBooks(getLength(),inputValue?.value,dataFilter,categoriesFilter));
       
      }
    })
  } //получение списка книг по клику на enter
  
  let findBooksToClick=(e)=>{
    let stopUploading=e.currentTarget.innerHTML;
    let inputValue=document.querySelector('#search_input');
    inputValue.blur()
    dispatch(getBooks(getLength(),inputValue.value,dataFilter,categoriesFilter,stopUploading));
  }//получение списка книг по клику на btn

  let cards=books?.map((item,i,arr)=>{
    return(<AllBooks id={item.id} url={item.volumeInfo.imageLinks?.smallThumbnail ? (item.volumeInfo.imageLinks?.smallThumbnail || "https://kartinkin.net/uploads/posts/2022-02/1645478722_74-kartinkin-net-p-kartinki-s-knigami-85.jpg") : (item.volumeInfo.imageLinks?.thumbnail  || "https://kartinkin.net/uploads/posts/2022-02/1645478722_74-kartinkin-net-p-kartinki-s-knigami-85.jpg") } autors={item.volumeInfo.authors} title={item.volumeInfo.title} subtitle={item.volumeInfo.subtitle ? item.volumeInfo.subtitle : item.searchInfo?.textSnippet || "Описание отсутствует"} categories={item.volumeInfo.categories}></AllBooks>)
  });// отрисовка массива с книгами

  

  let openCurrentWindow=(e)=>{
    let currentBook=e.target.closest('.card')
    if(Boolean(currentBook)){
      dispatch(setCurrentBook(currentBook.id,true))
    } 
  }//открытие компоненты с основной инфой книги

  return (
      <div>
        {openCurrentBook ? <CurrentBook></CurrentBook> :
          <div >
              <div className='search_container'>
                  <div className='search_group'>
                    <input type="text" className='search_input' id='search_input'  onFocus={findBooksToKey} onClick={(e)=>e.target.value=''} />
                    <button className='search_btn' onClick={findBooksToClick} >Найти</button>
                  </div>
                  <div className="search_group_select">
                      <div className='select_categories'>
                          <label for="categories" className='select_text'>Categories:</label>
                          <select name="categories" id="categories" className='select' defaultValue="all"  onChange={(e)=>setCategoriesFilter(e.target.value)}>
                              <option value="">all</option>
                              <option value="art">art</option>
                              <option value="biography">biography</option>
                              <option value="computers">computers</option>
                              <option value="history">history</option>
                              <option value="medical">medical</option>
                              <option value="poetry">poetry</option>
                          </select>
                        </div>
                        <div>
                          <label for="sort" className='select_text'>Sorting by:</label>
                          <select name="sort" id="sort" className='select' defaultValue="relevance"  onChange={(e)=>setDataFilter(e.target.value)}>
                              <option value="relevance" >relevance</option>
                              <option value="newest">newest</option>
                          </select>
                        </div>
                    </div>
              </div>
              
              {isFetching ? <Preloader></Preloader> :
                <>
                  {books?.length>=30 && <p>Found <b>{totalItems}</b> results</p>}
                    <div className='container' onClick={openCurrentWindow}>
                      {cards || "no results"}
                    </div>
                    <div className='load_more'>
                      {books?.length>=30 && <button className='load_more_btn' onClick={findBooksToClick}>Загрузить ещё</button>}
                    </div>
                </>
              
              }   
            </div> 
          
        }
      </div>
    
   
       
       
   
  );
}
//src name categories autors
export default App;
