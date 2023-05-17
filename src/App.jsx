import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
function App() {



  const [search, setSearch ] = useState("");
  const [data, setData ]= useState([]);

   const  getAllData = async (e) =>{

    if (e) e.preventDefault();   

    try {
        let res= await axios.get(`http://hn.algolia.com/api/v1/search?query=${search}`)
         setData(res.data.hits)
         console.log(res.data.hits)



    } catch (error) {
      console.log("Error " , error)
    }


   }



useEffect (() =>{

  getAllData();



}, [search])


  return (
    <>
    Search Live News 
    <input type="search"  onChange={(e) => { setSearch(e.target.value) }}/>


    {
  Array.isArray(data) ? (
    data.map((eachNews, i) => (
      <div className="card" key={i}>
        <h1>{eachNews.title}</h1>
        <p>{eachNews.url}</p>
        <p>{eachNews.author}</p>
      </div>
    ))
  ) : (
    <p>No data available</p>
  )
}
    </>
  );
}

export default App;
