import React, { useEffect, useState } from 'react'

const Pagination = ({ showPerPage, paginationChange ,total }) => {

  const [counter, setcounter] = useState(1)


  let noPages = Math.ceil(total/showPerPage)
   console.log(noPages)
// const [NumberOfPages , setnumberofPages] =  useState(noPages)



  useEffect(() => {
    let value = showPerPage * counter
     console.log(value)
    paginationChange(value - showPerPage, value)

  }, [counter])


  const onButtonClick = (type) => {

    if (type === "prev") {
      if (counter === 1) {
        setcounter(1)
      }
      else if (counter>1) {
        setcounter(counter-1)
      }
    }

    if(type === "next"){
      if(noPages === counter){

        setcounter(counter)
      }
   else {
setcounter(counter+1)
   }


    }

  }

  return (
    <div className='container mb-5'>
<nav style={{float:'right'}} aria-label="Page navigation example ">
  <ul className="pagination text-center ">
    <li className="page-item"><a className="page-link"  style={{cursor:'pointer'}} onClick={()=>{onButtonClick('prev')}} >Previous</a></li>

  {

new Array(noPages).fill("").map((curr ,index)=> (
     <li key={index}   className={`page-item ${ index+1===counter ? "active" :null}`}><a  style={{cursor:'pointer'}} onClick={()=>{setcounter(index+1)}} className="page-link" >{index+1}</a></li>) )

  }



       <li  className="page-item" ><a
       className="page-link"  style={{cursor:'pointer'}} onClick={()=>{onButtonClick("next")}} >Next</a></li>
  </ul>
</nav>

    </div>
  )
}

export default Pagination