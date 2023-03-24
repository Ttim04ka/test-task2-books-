

let initialState={
    searchItem:null,//данные инпута
    books:[],//масиив со всеми книгами по запросу
    preloader:null,//состояние прелоадера
    count:0,//счетчик для пагинации
    dataFilter:"relevance",//дата(для фильтрации)
    categoriesFilter:'', //Категории(для фильтрации)
    currentBook:null // данные выбранной книги
};

/* type InitialType=typeof initialState; */
const appReducer=(state = initialState, action)=>{
    switch (action.type) {
        case 'ADD-BOOKS':
            if(state.searchItem!==action.search){
                state.books=action.arr;
            }
            else{
                if(state.books?.length>0 && state.dataFilter===action.data && state.categoriesFilter===action.categories){
                    state.books.push(...action.arr)
                }else{
                    state.books=action.arr
                }
            }
            state.searchItem=action.search;
            state.dataFilter=action.data;
            state.categoriesFilter=action.categories
          return {...state,books:state.books,searchItem:state.searchItem,dataFilter:state.dataFilter,categoriesFilter:state.categoriesFilter};

        case 'SET-PRELOADER':
        return {...state,preloader:action.bool};
        case 'SET-COUNT':
            return {...state,count:action.count};
        case 'SET-BOOK':
            state.currentBook={opened:action.opened,data:state.books.filter(item=>item.id===action.id)}
            return {...state,books:state.books,currentBook:state.currentBook};
           
        default:
            return state
    }
};




export const getBooks = (start,searchItem,dataFilter,categories,upload) => async dispatch => {
    upload==="Загрузить ещё" ? dispatch(setPreloader(null)) : dispatch(setPreloader(true))//измененния состояния прелоадера
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchItem}+subject:${categories}&maxResults=30&startIndex=${start}&orderBy=${dataFilter}&key=AIzaSyCNVktAOBT6XFG1kNRx7Wtj4HdEcxubZSc`)
    .then(response=>{
        return response.json();
    })
    .then(items=>{ 
       dispatch(setAllCount(items.totalItems))
       dispatch(addBooks(items.items,searchItem,dataFilter,categories))
       dispatch(setPreloader(false))         
    }).catch(err => console.log(err)) 
      
    
}
/* export const getCurrentBook = (opened,id) => async dispatch => {
   
    await fetch(`https://books.google.com/books?id=${id}&key=AIzaSyCNVktAOBT6XFG1kNRx7Wtj4HdEcxubZSc`)
    .then(responses=>{
        console.log(responses.json());
    })
    
    
} */


/* type ActionTypes=ReturnType<typeof addBooks>|
                 ReturnType<typeof setPreloader>|
                 ReturnType<typeof setAllCount>|
                 ReturnType<typeof setCurrentBook>
               
 */

                 
export function addBooks(arr,search,data,categories) {
    return { type: 'ADD-BOOKS', arr,search,data,categories} 
}
export function setPreloader(bool) {
    return { type: 'SET-PRELOADER', bool} 
}
export function setAllCount(count) {
    return { type: 'SET-COUNT', count} 
}
export function setCurrentBook(id,opened) {
    return { type: 'SET-BOOK', id,opened} 
}



export default appReducer;