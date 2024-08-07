import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (toEmail, otp) => {
  const mailOptions = {
    from: {
      name: "MealMix",
      address: process.env.EMAIL_USER,
    },
    to: toEmail,
    subject: "OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<b>Your OTP code is ${otp}</b>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
