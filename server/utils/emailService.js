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
    subject: "Your MealMix OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h1 style="color: #008080; text-align: center;">MealMix</h1>
          <p style="font-size: 18px;">Hello,</p>
          <p style="font-size: 18px;">Your OTP code is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 20px; font-weight: bold; padding: 8px 16px; background-color: #008080; color: #ffffff; border-radius: 8px;">${otp}</span>
          </div>
          <p style="font-size: 18px;">Please enter this code in the app to proceed.</p>
          <p style="font-size: 18px;">If you did not request this code, please ignore this email.</p>
          <p style="font-size: 18px;">The MealMix Team</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
