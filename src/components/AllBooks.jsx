import React from 'react';
import '../App.css';

function AllBooks(props) {

  let correctAutors=()=>{
    let autors='';
    props.autors?.forEach((element,i,arr) => {
        i===(arr.length-1) ? autors+=element : autors+=(element+",");
        
    });
    return autors
  }//получения отфильтронванного списка авторов
  

  return (

          <div className='card'id={props.id} key={Math.random(1000)}>
               <img src={props.url} className='card_img' alt="" />
                <p className='card_title'>{props.title}</p>
                <p className='card_subtitle'>{props.subtitle}</p>
                <p className='card_autors'>{correctAutors()}</p>
                <p className='card_categories'>{props.categories || "No categories"}</p>
          </div>
           
   
  );
}

export default AllBooks;
