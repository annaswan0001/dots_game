import React from "react";
import './Loader.scss'


let array = new Array(10).fill("element");
export default function Loder() {
 
  return (
    <div className="loader">
       {array && array.map((el,i)=>{
         return <span key={i} className="loader-block"></span>
       })}
   
    </div>
  );
}


