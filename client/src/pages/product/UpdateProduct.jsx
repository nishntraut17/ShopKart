// import React, { useState } from "react";
// import uploadImage from "../../common/uploadImage";
// import { LinearProgress } from "@mui/material";
// import toast from "react-hot-toast";
// import {
//   useGetProductQuery,
//   useUpdateProductMutation,
// } from "../../features/product/productApiSlice";
// import { useParams } from "react-router-dom";
// import {useNavigate} from 'react-router-dom';

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data } = useGetProductQuery(id);
//   const [updateProduct] = useUpdateProductMutation();

//   const [formDetails, setFormDetails] = useState({
//     name: data?.name || "",
//     productImage: data?.productImage || "",
//     description: data?.description || "",
//     category: data?.category || "",
//     brand: data?.brand || "",
//   });

//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     if (e.target.id === "image") {
//       uploadImage(e, setProgress, setFormDetails, formDetails);
//     } else {
//       setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formDetails.productImage) return toast.error("Upload product image");
//     if (!formDetails.ingredients.length)

//     try {
//       const product = await toast.promise(
//         updateProduct({ ...formDetails, productId: id }).unwrap(),
//         {
//           pending: "Please wait...",
//           success: "Product updated successfully",
//           error: "Unable to Update Product",
//         }
//       );
//       navigate(`/product/${id}`);
//     } catch (error) {
//       toast.error(error.data);
//       console.error(error);
//     }
//   };

//   return (
//     <section className="box flex flex-col gap-6">
//       <h2 className="font-bold text-xl">Add New Product</h2>
//       <hr />

//         <form
//           className="flex flex-col-reverse md:flex-row gap-4 mt-10 justify-around"
//           onSubmit={handleSubmit}
//         >
//           <div className="basis-1/2 flex flex-col gap-5">
//             <div className="flex flex-col sm:flex-row justify-between">
//               <label
//                 htmlFor="title"
//                 className="text-sm font-semibold mb-3 basis-1/2"
//               >
//                 Product name
//               </label>
//               <div className="flex flex-col basis-1/2">
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   value={formDetails.name}
//                   id="title"
//                   name="title"
//                   pattern={"^.{3,}$"}
//                   required
//                   aria-required="true"
//                   placeholder="Enter recipe name"
//                   className="p-1.5 border bg-gray-100 rounded focus:outline outline-primary"
//                 />
//               </div>
//             </div>
//             <hr />
//             <div className="flex flex-col sm:flex-row justify-between">
//               <label
//                 htmlFor="description"
//                 className="text-sm font-semibold mb-3 basis-1/2"
//               >
//                 Product description
//               </label>
//               <div className="flex flex-col basis-1/2">
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   value={formDetails.description}
//                   id="description"
//                   required
//                   name="description"
//                   rows="5"
//                   aria-required="true"
//                   placeholder="Enter your description here..."
//                   className="p-1.5 border bg-gray-100 rounded focus:outline outline-primary w-full resize-none"
//                 ></input>
//               </div>
//             </div>
//             <hr />
//             <div className="flex flex-col sm:flex-row justify-between">
//               <label
//                 htmlFor="category"
//                 className="text-sm font-semibold mb-3 basis-1/2"
//               >
//                 Category
//               </label>
//               <div className="flex flex-col basis-1/2">
//                 <input
//                   type="number"
//                   onChange={handleChange}
//                   value={formDetails.calories}
//                   id="category"
//                   required
//                   name="category"
//                   aria-required="true"
//                   placeholder="Enter total calories"
//                   className="p-1.5 border bg-gray-100 rounded focus:outline outline-primary"
//                 />
//               </div>
//             </div>
//             <hr />     
//             <button
//               type="submit"
//               className="rounded px-4 py-1 max-w-max"
//             >
//                 Update Changes
//             </button>
//           </div>
//           <hr className="block md:hidden mt-6" />
//           {/* Upload recipe image */}
//           <div className="basis-1/3 rounded-xl shadow-md hover:shadow-primary hover:shadow flex justify-center items-center w-full p-8 max-h-[300px]">
//             <label
//               htmlFor="image"
//               className="font-bold cursor-pointer flex flex-col justify-center items-center w-full"
//             >
//               <div
//                 className={formDetails.image ? "w-[65%] mb-2" : "w-[30%] mb-6"}
//               >
//                 {progress > 0 && progress < 100 ? (
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     color="warning"
//                   />
//                 ) : (
//                   <img
//                     src={formDetails.productImage}
//                     alt="upload"
//                     className="w-full "
//                   />
//                 )}
//               </div>
//               <p className="text-center">
//                 Drag your image here, or
//                 <span className="text-primary"> browse</span>
//               </p>
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="hidden"
//               onChange={handleChange}
//             />
//           </div>
//         </form>
//     </section>
//   );
// };

// export default UpdateProduct
import React from 'react'

const UpdateProduct = () => {
  return (
    <div>UpdateProduct</div>
  )
}

export default UpdateProduct
