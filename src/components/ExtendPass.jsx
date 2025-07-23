



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ExtendPass = () => {
//   const { id } = useParams();
//   const [pass, setPass] = useState(null);
//   const [months, setMonths] = useState('');
//   const [additionalAmount, setAdditionalAmount] = useState(null);
//   const [newEndDate, setNewEndDate] = useState('');
//   const [isPaying, setIsPaying] = useState(false);

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/public/${id}`)
//       .then((res) => setPass(res.data))
//       .catch((err) => console.error('Error fetching pass:', err));
//   }, [id]);

//   useEffect(() => {
//     if (!months || !pass) return;

//     const monthlyRate = pass.amount / pass.duration;
//     const amount = monthlyRate * parseInt(months);
//     setAdditionalAmount(amount);

//     const currentEnd = new Date(pass.endDate);
//     const baseDate = currentEnd > new Date() ? currentEnd : new Date();
//     const futureDate = new Date(baseDate);
//     futureDate.setMonth(futureDate.getMonth() + parseInt(months));
//     setNewEndDate(futureDate.toISOString().split("T")[0]);
//   }, [months, pass]);

//   const handlePayment = async () => {
//     if (!months) return alert("Please select duration to extend");

//     setIsPaying(true);

//     try {
//       // 1️⃣ Create Razorpay order
//       const res = await axios.post('http://localhost:5000/api/payment/create-order', {
//         amount: additionalAmount
//       });

//       const options = {
//         key: 'rzp_test_IRlrmLw4AKvQQb', // 🔁 replace with process.env if needed
//         amount: res.data.amount * 100,
//         currency: 'INR',
//         name: 'Parking Pass',
//         description: 'Extend Monthly Pass',
//         order_id: res.data.orderId,
//         handler: async function (response) {
//           // 2️⃣ On success, update the pass
//           await axios.put(`http://localhost:5000/api/extendPass/${id}`, {
//             months: parseInt(months),
//           });

//           alert('✅ Payment successful and pass extended!');
//           setMonths('');
//           setAdditionalAmount(null);
//         },
//         prefill: {
//           name: pass.name,
//           email: '',
//           contact: ''
//         },
//         theme: {
//           color: '#3399cc'
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert('❌ Payment initiation failed');
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   if (!pass) return <p className="text-center mt-10 text-gray-500">Loading pass data...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
//       <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">🛵 Extend Monthly Pass</h2>
//       <p className="mb-2"><span className="font-bold">Name:</span> {pass.name}</p>
//       <p className="mb-2"><span className="font-bold">Vehicle No:</span> {pass.vehicleNo}</p>
//       <p className="mb-4"><span className="font-bold">Current End Date:</span> {new Date(pass.endDate).toDateString()}</p>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Extend Duration:</label>
//           <select
//             value={months}
//             onChange={(e) => setMonths(e.target.value)}
//             required
//             className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select months</option>
//             <option value="3">3 Months</option>
//             <option value="6">6 Months</option>
//             <option value="9">9 Months</option>
//             <option value="12">12 Months</option>
//           </select>
//         </div>

//         {additionalAmount !== null && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-md">
//             <p>🧾 <strong>Amount to Pay:</strong> ₹{additionalAmount}</p>
//             <p>📅 <strong>New End Date:</strong> {newEndDate}</p>
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={handlePayment}
//           disabled={isPaying}
//           className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
//         >
//           {isPaying ? 'Processing...' : 'Pay Now'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExtendPass;





// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ExtendPass = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [pass, setPass] = useState(null);
//   const [months, setMonths] = useState('');
//   const [additionalAmount, setAdditionalAmount] = useState(null);
//   const [newEndDate, setNewEndDate] = useState('');
//   const [isPaying, setIsPaying] = useState(false);

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   // Fetch pass details
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/public/${id}`)
//       .then((res) => setPass(res.data))
//       .catch((err) => console.error('Error fetching pass:', err));
//   }, [id]);

//   // Calculate additional amount and new end date
//   useEffect(() => {
//     if (!months || !pass) return;

//     const monthlyRate = pass.amount / pass.duration;
//     const amount = monthlyRate * parseInt(months);
//     setAdditionalAmount(amount);

//     const currentEnd = new Date(pass.endDate);
//     const baseDate = currentEnd > new Date() ? currentEnd : new Date();
//     const futureDate = new Date(baseDate);
//     futureDate.setMonth(futureDate.getMonth() + parseInt(months));
//     setNewEndDate(futureDate.toISOString().split("T")[0]);
//   }, [months, pass]);

//   const formatAmount = (amount) => {
//     return amount.toLocaleString('en-IN');
//   };

//   // Handle payment
//   const handlePayment = async () => {
//     if (!months) return alert("Please select duration to extend");

//     setIsPaying(true);

//     try {
//       const res = await axios.post('http://localhost:5000/api/payment/create-order', {
//         amount: additionalAmount
//       });

//       const options = {
//         key: 'rzp_test_IRlrmLw4AKvQQb',
//         amount: res.data.amount * 100,
//         currency: 'INR',
//         name: 'Parking Pass',
//         description: 'Extend Monthly Pass',
//         order_id: res.data.orderId,
//         handler: async function (response) {
//           await axios.put(`http://localhost:5000/api/extendPass/${id}`, {
//             months: parseInt(months),
//           });

//           alert('✅ Payment successful and pass extended!');
//           setMonths('');
//           setAdditionalAmount(null);

//           // ✅ Redirect after success
//           navigate('/my-pass'); // 🔁 Change this to your actual page
//         },
//         prefill: {
//           name: pass.name,
//           email: '',
//           contact: ''
//         },
//         theme: {
//           color: '#3399cc'
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert('❌ Payment initiation failed');
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   if (!pass) return <p className="text-center mt-10 text-gray-500">Loading pass data...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
//       <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">🛵 Extend Monthly Pass</h2>
//       <p className="mb-2"><span className="font-bold">Name:</span> {pass.name}</p>
//       <p className="mb-2"><span className="font-bold">Vehicle No:</span> {pass.vehicleNo}</p>
//       <p className="mb-4"><span className="font-bold">Current End Date:</span> {new Date(pass.endDate).toDateString()}</p>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Extend Duration:</label>
//           <select
//             value={months}
//             onChange={(e) => setMonths(e.target.value)}
//             required
//             className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select months</option>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1} Month{i + 1 > 1 ? 's' : ''}
//               </option>
//             ))}
//           </select>
//         </div>

//         {additionalAmount !== null && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-md">
//             <p>🧾 <strong>Amount to Pay:</strong> ₹{formatAmount(additionalAmount)}</p>
//             <p>📅 <strong>New End Date:</strong> {newEndDate}</p>
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={handlePayment}
//           disabled={isPaying}
//           className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
//         >
//           {isPaying ? 'Processing...' : 'Pay Now'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExtendPass;



















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExtendPass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState(null);
  const [months, setMonths] = useState('');
  const [additionalAmount, setAdditionalAmount] = useState(null);
  const [newEndDate, setNewEndDate] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    axios.get(`https://kj8cjmpw-5000.inc1.devtunnels.ms/api/public/${id}`)
      .then((res) => setPass(res.data))
      .catch((err) => {
        console.error('Error fetching pass:', err);
        toast.error("❌ Failed to fetch pass details");
      });
  }, [id]);

  useEffect(() => {
    if (!months || !pass) return;

    const monthlyRate = pass.amount / pass.duration;
    const amount = monthlyRate * parseInt(months);
    setAdditionalAmount(amount);

    const currentEnd = new Date(pass.endDate);
    const baseDate = currentEnd > new Date() ? currentEnd : new Date();
    const futureDate = new Date(baseDate);
    futureDate.setMonth(futureDate.getMonth() + parseInt(months));
    setNewEndDate(futureDate.toISOString().split("T")[0]);
  }, [months, pass]);

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  const handlePayment = async () => {
    if (!months) return toast.warn("⚠️ Please select duration to extend");

    setIsPaying(true);

    try {
      const res = await axios.post('https://kj8cjmpw-5000.inc1.devtunnels.ms/api/payment/create-order', {
        amount: additionalAmount
      });
 
      const options = {
        key: 'rzp_test_mSi4gg4GGOwQF6',
        amount: res.data.amount * 100,
        currency: 'INR',
        name: 'Parking Pass',
        description: 'Extend Monthly Pass',
        order_id: res.data.orderId,
        handler: async function (response) {
          // Optional: Save Razorpay payment details
          await axios.put(`https://kj8cjmpw-5000.inc1.devtunnels.ms/api/extendPass/${id}`, {
            months: parseInt(months),
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            orderId: response.razorpay_order_id,
          });

          toast.success("✅ Payment successful! Pass extended");
          setMonths('');
          setAdditionalAmount(null);

          setTimeout(() => navigate('/my-pass'), 2000); // 👈 redirect after 2 sec
        },
        prefill: {
          name: pass.name,
          email: '',
          contact: ''
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("❌ Payment initiation failed");
    } finally {
      setIsPaying(false);
    }
  };

  if (!pass) return <p className="text-center mt-10 text-gray-500">Loading pass data...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">🛵 Extend Monthly Pass</h2>
      <p className="mb-2"><span className="font-bold">Name:</span> {pass.name}</p>
      <p className="mb-2"><span className="font-bold">Vehicle No:</span> {pass.vehicleNo}</p>
      <p className="mb-4"><span className="font-bold">Current End Date:</span> {new Date(pass.endDate).toDateString()}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Extend Duration:</label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Month{i + 1 > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {additionalAmount !== null && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-md">
            <p>🧾 <strong>Amount to Pay:</strong> ₹{formatAmount(additionalAmount)}</p>
            <p>📅 <strong>New End Date:</strong> {newEndDate}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handlePayment}
          disabled={isPaying}
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isPaying ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </div>

      {isPaying && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50 rounded-md">
          <div className="loader border-4 border-blue-600 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ExtendPass;
