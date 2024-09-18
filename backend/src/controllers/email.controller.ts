import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendMail = async (option:any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from environment variables
        pass: process.env.EMAIL_PASS,  // Your Gmail app password from environment variables
      },
    });

    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // Sender address
      // to: 'ddjail2004@gmail.com, djcodes2004@gmail.com', // List of receivers
      to: option.to,
      subject: option.subject, // Subject line
      text: option.message, // Plain text body
      html: option.html, // HTML body
    });

    console.log('Message sent: %s', info.messageId);

    // Return the info instead of sending a response if u send response and pay fee data is also sending response which causes sending response twice to the client
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default sendMail;
