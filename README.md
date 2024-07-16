# NodeJS Weather Application

This NodeJS application includes user authentication, integration with the OpenWeatherMap API, periodic email notifications using `node-cron`, AI-generated weather descriptions, error handling, and deployment via Vercel.

# Setup Instructions

Follow these steps to clone the project, install the required packages, and configure the environment variables.

## Clone the Project

To clone the project repository, run the following command in your terminal or you can download and run this.

```bash
git clone https://github.com/codeIndrajith/Weather-API.git
cd your-repo-name
```

## Go to root file and install pacjages
```bash
 npm install
```
## Configure Environment variables
```bash
NODE_ENV=your_enviromnet
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
WEATHER_MAP_API_KEY=your_weather_map_api_key
GMAIL_EMAI=email_service_provider
GMAIL_PASSWORD=google_app_password(Plsese generate this carefully, following Google instruction)
GEMINI_API_KEY=your_geminiai_api_key
```

## Start the server 
```bash
 npm start
```

## Features

1. **User Authentication**
    - Setup includes dependencies for NodeJS application.
    - Created routes and controllers for user registration and login (name, email, password, and location).
    - Implemented logout functionality.
    - Added authentication to secure routes using JWT tokens. Tokens are generated on user registration and login, and stored in cookies.
    - Protected routes using middleware to ensure only authenticated users can access certain routes.
    - Logout functionality destroys the cookie, preventing access to protected routes.

2. **OpenWeatherMap API Integration**
    - Fetches weather details using the user's location.
    - Includes two parts, fetching current weather details and fetching forecast weather data for a given day.
    - Uses the Forecast Weather API to fetch 5-day, 3-hour interval forecast data.
    - Created two controllers to store weather data for each user's location and display forecast weather data for the given day.

3. **Send Email to every 3 hours each user email**
    - Utilizes `nodemailer` and `node-cron` libraries.
    - Created email content and service following the documentation.
    - Emails include a table with three parts weather, wind speed, and AI-generated weather details.
    - Implemented email schedules to send emails every 3 hours to each user using `node-cron`.
    - Scheduled emails are triggered from the application's entry point.

4. **AI-Generated Weather Descriptions**
    - Uses Gemini AI API to generate text descriptions of the weather.
    - Before sending email, sent a prompt a temperature to `Describe the weather using only three words for this temperature.${temperature}`
    - Its generate a text about weather and send email section after send the email to user.
    - Finally the AI-generated text is included in the email content and sent each users every 3 hours.

5. **Error Handling Middleware**
    - Created an error middleware file to handle errors.
    - Includes two main parts:
        - `notFound` -  Creates a new error with a 404 status when a requested route is not found and passes it to the next middleware.
        - `errorHandler` - Handles errors by setting the appropriate status code and message, including specific handling for Mongoose errors. Returns a JSON response with the error message and stack trace if not in production.

6. **Deployment to Vercel**
    - Created a Vercel project for deployment.
    - Added a `vercel.json` file to control Vercel configuration.
    - Successfully deployed the application using Vercel serverless functions.

## Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
