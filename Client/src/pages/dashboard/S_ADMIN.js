// import React from 'react'

// const S_ADMIN = () => {
//   return (
//     <div>





// {subAdminData.length > 0 ? mapReverse2.slice(pagination.start, pagination.end).map(
//   ({ name, email, mobile, online, _id, is_Active, addedBy }, key) => {
//     const className = `py-3 px-5 ${key === mapReverse2.length - 1
//       ? ""
//       : "border-b border-blue-gray-50"
//       }`;


//     return (
//       <tr key={name}>


//         <td className={className}>
//           <Typography className="text-xs font-semibold text-blue-gray-600">
//             {/* {job[0]} */}
//             {pagination.start === 0 ? key + 1 : pagination.start + key + 1}
//           </Typography>
//           <Typography className="text-xs font-normal text-blue-gray-500">
//             {/* {job[1]} */}
//           </Typography>
//         </td>


//         <td className={className}>
//           <div className="flex items-center gap-4">
//             {/* <Avatar src={img} alt={name} size="sm" /> */}
//             <div>
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-semibold"
//               >
//                 {name}
//               </Typography>
//               <Typography className="text-xs font-normal text-blue-gray-500">
//                 {email}
//               </Typography>
//             </div>
//           </div>
//         </td>

//         <td className={className}>
//           <Typography className="text-xs font-semibold text-blue-gray-600">
//             {
//               addedBy}
//           </Typography>
//         </td>
//         <td className={className}>
//           <Typography className="text-xs font-semibold text-blue-gray-600">
//           <button onMouseOver={()=>{getTotalClients(_id)}}  ><GrView/></button>

//           </Typography>
//         </td>
//         <td className={className}>
//           <Switch onChange={() => { status(_id, is_Active) }}
//             checked={is_Active === true} />
//         </td>


//         <td className={className}>
//           <Typography className="text-xs font-semibold text-blue-gray-600">
//             {mobile}
//           </Typography>
//         </td>
//         <td style={{ display: 'flex' }} className={className}>




//           <button data-bs-toggle="modal" data-bs-target="#puspe" onClick={() => { update_admin(_id) }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded mx-2">
//             <BiEdit />
//           </button>
//           <button onClick={() => { delete_admin(_id) }} className="bg-red-500 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded">
//             <AiFillDelete />
//           </button>


//         </td>
//       </tr>
//     );
//   }
// )

//   : <>

//     <figure style={{ width: '500px' }}>
//       <img style={{ width: '150px', float: 'right' }} src={pic} alt="" />
//     </figure>

//   </>

// }


//     </div>
//   )
// }

// export default S_ADMIN
