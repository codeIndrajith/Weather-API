import nodemailer from 'nodemailer';

const sendEmailToUser = async (location, email, weatherData, weatherTextAI) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    user: 'smtp.gmail.com',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      type: 'login',
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const emailContent = weatherData
    ? `
    <h2> ${location}</h2>
    <table>
        <thead>
            <td>Weather</td>
            <td>Wind Speed</td>
            <td>Weather Details AI</td>
        </thead>
        <tbody>
            <td>${weatherData.weather[0].description}</td>
            <td>${weatherData.wind.speed}</td>
            <td>${weatherTextAI}</td>
        </tbody>
    </table>
  `
    : 'Weather data is not available';

  const mailOption = {
    from: process.env.GMAIL_SENDER,
    to: email,
    subject: 'Weather Report',
    html: emailContent,
  };
  try {
    await transporter.sendMail(mailOption);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};

export default sendEmailToUser;
