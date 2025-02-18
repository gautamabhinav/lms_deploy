import { v2 } from 'cloudinary';
import Razorpay from 'razorpay';

import app from './app.js';
// import express from "./express";
import connectToDB from './configs/dbConn.js';

// import path from "path";


// const _dirname = path.resolve();

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create an order
// export const options = {
//   amount: 10000,  // Amount in paise (₹100.00)
//   currency: 'INR',
//   receipt: 'order_rcptid_11'
// };

const PORT = process.env.PORT || 5000;

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, "build")));

// // Serve index.html for any route (SPA support)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(PORT, async () => {
  // Connect to DB
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});
