// src/PaymentForm.js
import React, { useState } from 'react';
import './PaymentForm.css';
import { addPayment } from './api';
const PaymentForm = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');





  const handleSubmit = async(e) => {
    e.preventDefault();
     

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.onerror = () => {
  alert("Razorpay SDK failed to load. Are you online?");
};
script.onload = async () => {
  try {
     let key ="";
     let num = parseInt(amount);
     let count =0;
     if(num>1000)
     {
        
        key="rzp_test_wmDl5TjphiigG5";
        num = amount*100;
     }
     else
     {
        key = "rzp_test_J4fInjDpTX475d";
         num = amount*100;
     }
    console.log("hi");
    let paymentDetails = {
             email: username,
                amount: amount
              };
          console.log(paymentDetails);
              
        //   let res =  await addPayment(paymentDetails);
        //   alert("res ",res);
          const handlePaymentClose = () => {
            
            setSubmittedData("");
            alert('Payment window closed');
            
          };

    const options = {
      key: key, 
      amount:num ,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: "",
      handler: async function (response) {
       
         let res =  await addPayment(paymentDetails);

         alert("Payment Successful!");
         setAmount("");
         setUsername("");
         setSubmittedData("");
        
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Acme Corp"
      },
      theme: {
        color: "#61dafb"
      },
      onClose: function() {
        alert('Payment window closed');
        handlePaymentClose();
        console.log('Payment window closed');
        
      }
    };
    console.log("options",options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    count = 1;
    if(count===1)
    {
        setSubmittedData({ username, amount });
    }
    

  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};
document.body.appendChild(script);
  
       
  };

  return (
    <div className="payment-form">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
      {error && <p className="error">{error}</p>}
      {submittedData && (
        <div className="submitted-data">
          <h3>To Pay</h3>
          <p>Username: {submittedData.username}</p>
          <p>Amount: ₹{submittedData.amount}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
