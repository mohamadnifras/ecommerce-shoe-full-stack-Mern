// import React, { useEffect } from "react";
// import { Box, Grid, TextField, Typography, MenuItem } from "@mui/material";
// import { useState } from "react";
// import { LiaLongArrowAltRightSolid } from "react-icons/lia";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../features/cartSlice";
// import { createOrder, paymentVerify } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";

// function OrderContact() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     street: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     mobile: "",
//   });
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.cart);
//   console.log(cart, "aaaaa");

//   useEffect(() => {
//     dispatch(getCart({ page: 1, limit: 10 }));
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.street ||
//       !formData.pinCode ||
//       !formData.state ||
//       !formData.mobile ||
//       !formData.city
//     ) {
//       toast.error("Please fill in all fields.");
//       return;
//     }
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.mobile)) {
//       toast.error("Please enter a valid phone number.");
//       return;
//     }
//     const orderDate = new Date().toLocaleString();
//     const orderData = {
//       shippingAddress: {
//         address: `${formData.street},${formData.city},${formData.state},${formData.pinCode}`,
//         phoneNumber: formData.mobile,
//         fullName: `${formData.firstName} ${formData.lastName}`,
//         city: formData.city,
//         state: formData.state,
//         postalCode: formData.pinCode,
//       },
//       orderItems: cart?.items || [],
//       totalAmount: cart?.totalItemPrice,
//       date: orderDate,
//       paymentMethod: "razorpay",
//     };
//     dispatch(createOrder(orderData))
//       .unwrap()
//       .then((response) => {
//         console.log(response.order,'hello react')
//         if (response) {
//           openRazorpayPayment(response.order.razorpayOrderId, response.order.totalAmount);
//         }
//         dispatch(getCart({ page: 1, limit: 10 }))
//       })
//       .catch((error) => {
//         toast.error(error);
//       });
//   };

//  const openRazorpayPayment = (razorpayOrderId, amount) => {
//      const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//        amount: amount,
//        currency: "INR",
//        name: "Teach Shoe",
//        description: "Product Payment",
//        order_id: razorpayOrderId,
//        handler: function (response) {
//         console.log(response,'handler')
//          const paymentDetails = {
//            paymentId: response.razorpay_payment_id,
//            orderId: razorpayOrderId,
//          };      
 
//          dispatch(paymentVerify(paymentDetails))
//            .unwrap()
//            .then(() => {
//              navigate("/");
//            })
//            .catch((error) => {
//              toast.error(error.message);
//            });
//        },
//        prefill: {
//          name: formData.name,
//          contact: formData.phone,
//        },
//        theme: {
//          color: "#F37254",
//        },
//        method: {
//          card: true,
//          upi: true,
//          netbanking: true,
//          wallet: true,
//          config: {
//            display: {
//              hide: {
//                method: ["upi_collect"],
//              },
//            },
//          },
//        },
//      };
 
//      const razorpay = new window.Razorpay(options);
//      razorpay.open();
//    };
//   return (
//     <div className="w-full md:w-[90%] lg:w-[700px] mx-auto px-4">
//        <ToastContainer
//       className="toast-container"
//       position="top-right"
//       autoClose={3500}
//       hideProgressBar={false}
//       newestOnTop
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       limit={1}
//     />
//       <h1 className="uppercase font-bold text-[20px] tracking-normal">
//         Contact
//       </h1>
//       <div className="py-10 border-b border-b-gray-300">
//         <p className="text-[18px] font-extralight">
//           mohamadnifras2004@gmail.com
//         </p>
//       </div>
//       <div className="">
//         <h1 className="text-black font-bold text-[20px] uppercase py-7">
//           Address
//         </h1>
//         <h2 className="text-black font-mono text-[19px] tracking-tight">
//           Delivery address
//         </h2>

//         <Box sx={{ py: 3 }} component="form" onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {/* First Name and Last Name */}
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="First Name *"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "320px" }}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="Last Name *"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "320px" }}
//               />
//             </Grid>

//             {/* Street Address */}
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="Street Address *"
//                 placeholder="E.g. 3 Stripes Street"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "655px" }}
//               />
//             </Grid>

//             {/* city */}
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="City *"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "320px" }}
//               />
//             </Grid>

//             {/* State Dropdown */}
//             <Grid item>
//               <TextField
//                 select
//                 label="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 fullWidth
//                 sx={{ width: "320px" }}
//               >
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="kerala">Kerala</MenuItem>
//                 <MenuItem value="tamilnadu">Tamil Nadu</MenuItem>
//                 <MenuItem value="karnataka">Karnataka</MenuItem>
//               </TextField>
//             </Grid>

//             {/* Pin Code and Mobile - side by side */}
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="Pin Code *"
//                 name="pinCode"
//                 value={formData.pinCode}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "320px" }}
//               />
//             </Grid>
//             {/* Country */}
//             <Grid item sx={{ width: "320px" }} className="flex items-center">
//               <Typography fontWeight="bold">
//                 Country: <span style={{ fontWeight: 400 }}>India</span>
//               </Typography>
//             </Grid>

//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="Mobile Number *"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 variant="outlined"
//                 sx={{ width: "655px" }}
//               />
//               <Typography variant="caption" color="text.secondary">
//                 We will only call you if there are questions regarding your
//                 order.
//               </Typography>
//             </Grid>

//             {/* Submit Button */}
//             <Grid item className="pt-2">
//               <button
//                 type="submit"
//                 className="relative -top-1 -left-1 bg-black py-2.5 px-5 w-[350px]  uppercase text-white transition-all transform hover:scale-105 hover:top-0 hover:left-0 before:absolute before:top-1 before:left-1 before:-z-[0] before:h-full before:w-[350px] before:border-2 before:border-black before:transition-all before:content-[''] hover:before:top-0 hover:before:left-0 hover:before:border-black flex justify-between hover:text-gray-300 font-bold"
//               >
//                 Confirm Payment
//                 <div>
//                   <LiaLongArrowAltRightSolid size={30} />
//                 </div>
//               </button>
//             </Grid>
//           </Grid>
//           <div className="flex items-center gap-4 mt-4 flex-shrink grayscale-100 ">
//             <img
//               src="/icon-adidas-mastercard.svg"
//               alt="Mastercard"
//               className="h-6"
//             />
//             <img
//               src="/icon-adidas-online-banking.svg"
//               alt="Bank"
//               className="h-6"
//             />
//             <img src="/icon-adidas-visa.svg" alt="Visa" className="h-6" />
//             <img src="/icon-adidas-rupay.svg" alt="RuPay" className="h-6" />
//             <img src="/icon-adidas-upi.svg" alt="UPI" className="h-6" />
//           </div>
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default OrderContact;







import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cartSlice";
import { createOrder, paymentVerify } from "../../features/orderSlice";
import { useNavigate } from "react-router-dom";

function OrderContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.street ||
      !formData.pinCode ||
      !formData.state ||
      !formData.mobile ||
      !formData.city
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobile)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const orderDate = new Date().toLocaleString();
    const orderData = {
      shippingAddress: {
        address: `${formData.street},${formData.city},${formData.state},${formData.pinCode}`,
        phoneNumber: formData.mobile,
        fullName: `${formData.firstName} ${formData.lastName}`,
        city: formData.city,
        state: formData.state,
        postalCode: formData.pinCode,
      },
      orderItems: cart?.items || [],
      totalAmount: cart?.totalItemPrice,
      date: orderDate,
      paymentMethod: "razorpay",
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then((response) => {
        if (response) {
          openRazorpayPayment(
            response.order.razorpayOrderId,
            response.order.totalAmount
          );
        }
        dispatch(getCart({ page: 1, limit: 10 }));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const openRazorpayPayment = (razorpayOrderId, amount) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Teach Shoe",
      description: "Product Payment",
      order_id: razorpayOrderId,
      handler: function (response) {
        const paymentDetails = {
          paymentId: response.razorpay_payment_id,
          orderId: razorpayOrderId,
        };

        dispatch(paymentVerify(paymentDetails))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      },
      prefill: {
        name: formData.name,
        contact: formData.phone,
      },
      theme: {
        color: "#F37254",
      },
      method: {
        card: true,
        upi: true,
        netbanking: true,
        wallet: true,
        config: {
          display: {
            hide: {
              method: ["upi_collect"],
            },
          },
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="w-full max-w-[700px] mx-auto px-4">
      <ToastContainer position="top-right" autoClose={3500} limit={1} />
      <h1 className="uppercase font-bold text-lg">Contact</h1>
      <div className="py-6 border-b border-gray-300">
        <p className="text-md font-extralight">mohamadnifras2004@gmail.com</p>
      </div>
      <h1 className="font-bold text-lg uppercase py-6">Address</h1>
      <h2 className="text-[18px] font-mono tracking-tight">Delivery address</h2>

      <Box component="form" onSubmit={handleSubmit} sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Street Address *" name="street" placeholder="E.g. 3 Stripes Street" value={formData.street} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City *" name="city" value={formData.city} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="State *"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="kerala">Kerala</MenuItem>
              <MenuItem value="tamilnadu">Tamil Nadu</MenuItem>
              <MenuItem value="karnataka">Karnataka</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Pin Code *" name="pinCode" value={formData.pinCode} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} className="flex items-center">
            <Typography fontWeight="bold">
              Country: <span className="font-normal">India</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Mobile Number *" name="mobile" value={formData.mobile} onChange={handleChange} />
            <Typography variant="caption" color="text.secondary">
              We will only call you if there are questions regarding your order.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <button
              type="submit"
              className="relative -top-1 -left-1 bg-black py-2.5 px-5 w-full md:w-[350px] uppercase text-white transition-all transform hover:scale-105 hover:top-0 hover:left-0 before:absolute before:top-1 before:left-1 before:-z-[0] before:h-full before:w-full before:border-2 before:border-black before:transition-all before:content-[''] hover:before:top-0 hover:before:left-0 hover:before:border-black flex justify-between hover:text-gray-300 font-bold"
            >
              Confirm Payment
              <LiaLongArrowAltRightSolid size={30} />
            </button>
          </Grid>
        </Grid>

        <div className="flex items-center gap-4 mt-6 flex-wrap">
          <img src="/icon-adidas-mastercard.svg" alt="Mastercard" className="h-6" />
          <img src="/icon-adidas-online-banking.svg" alt="Bank" className="h-6" />
          <img src="/icon-adidas-visa.svg" alt="Visa" className="h-6" />
          <img src="/icon-adidas-rupay.svg" alt="RuPay" className="h-6" />
          <img src="/icon-adidas-upi.svg" alt="UPI" className="h-6" />
        </div>
      </Box>
    </div>
  );
}

export default OrderContact;
