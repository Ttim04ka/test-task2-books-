import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { setCurrentBook } from '../reducers/app-reducer';

let CurrentBook=React.memo((props)=>{
    let bookData=useSelector(state=>state.appReducer.currentBook?.data[0]);//массив с данными текущей  книги
    let dispatch=useDispatch();
    let returnBack=()=>{
      dispatch(setCurrentBook('',false));
    }//откат ко всем книгам
  return (

          <div className='book'  key={Math.random(1000)}>
                <div className='book_img_container'>
                    <img src={bookData.volumeInfo?.imageLinks.smallThumbnail || "https://kartinkin.net/uploads/posts/2022-02/1645478722_74-kartinkin-net-p-kartinki-s-knigami-85.jpg"} className='book_img' alt="" />
                </div>
                <div> 
                  <p className='book_title'>{bookData.volumeInfo?.title}</p>
                  <div className='book_subtitle' > {bookData.volumeInfo.subtitle || bookData.searchInfo?.textSnippet}</div>
                  <p className='book_autors'>{bookData.volumeInfo.authors}</p>
                  <p className='book_categories'>{bookData.volumeInfo.categories || "No categories"}</p>
                  <button className='back' onClick={returnBack}>Вернуться назад</button>
                </div>
               
          </div>
           
   
  );
})

export default CurrentBook;
