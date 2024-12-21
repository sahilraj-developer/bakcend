Backend Project - Node.js


Project Overview



This is a backend application built using Node.js, Express, and Docker. It is designed to provide an API for various functionalities, such as managing data, user authentication, and connecting to MongoDB for persistent storage. The application is containerized using Docker for easy deployment and management.

Technologies Used
Node.js: JavaScript runtime for building the application.
Express: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing data.
Docker: Containerization platform for running the app in isolated environments.
Nodemon: Tool for automatically restarting the application during development.
Project Structure
bash
Copy code
/backend
├── /config               # Configuration files (e.g., database connection)
├── /controllers          # Business logic for API endpoints
├── /models               # MongoDB models (schemas)
├── /routes               # API route definitions
├── /middleware           # Custom middleware (e.g., authentication)
├── app.js                # Main application entry point
├── Dockerfile            # Dockerfile to containerize the app
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Node.js package dependencies and scripts
├── .env                  # Environment variables
└── /node_modules         # Project dependencies
Setup Instructions
Prerequisites
Make sure you have the following installed:

Docker (for running containers)
Docker Compose (for orchestrating multi-container Docker applications)
1. Clone the Repository
Clone the backend project to your local machine:

bash
Copy code
git clone https://github.com/yourusername/backend.git
cd backend
2. Set up Environment Variables
Create a .env file in the root directory and configure your environment variables:

env
Copy code
NODE_ENV=production
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=4001
MONGO_URI: MongoDB URI to connect to the database.
PORT: Port on which the app will run.
3. Install Dependencies
You can install the dependencies by running:

bash
Copy code
npm install
Or, if you are using Docker to build the container, dependencies will be installed during the build process.

4. Docker Setup (Optional)
If you want to use Docker to run the app, follow these steps:

a. Build and Start the Docker Containers
Run the following command to build the Docker containers and start the services:

bash
Copy code
docker-compose up --build
This will start the application and MongoDB container as defined in the docker-compose.yml file.

b. Access the Application
Once the Docker containers are up, the application will be accessible at http://localhost:4001.

5. Start the Application (Without Docker)
If you’re not using Docker, you can run the application directly:

bash
Copy code
npm start
This will start the application in production mode.

6. Development Mode (Optional)
To run the application in development mode with automatic reloading using Nodemon:

bash
Copy code
npm run dev
API Endpoints
1. POST /login
Description: Authenticates the user and provides a JWT token.
Request Body:
json
Copy code
{
  "username": "user",
  "password": "password123"
}
Response:
json
Copy code
{
  "token": "jwt_token_here"
}
2. POST /register
Description: Registers a new user.
Request Body:
json
Copy code
{
  "username": "new_user",
  "password": "new_password123"
}
Response:
json
Copy code
{
  "message": "User registered successfully"
}
3. GET /user
Description: Fetches user data (protected route).
Headers:
json
Copy code
{
  "Authorization": "Bearer jwt_token_here"
}
Response:
json
Copy code
{
  "username": "user",
  "email": "user@example.com"
}
Docker Compose
The docker-compose.yml file is used to define and manage multi-container Docker applications. The current setup includes:

Server (Node.js app): Runs the backend server.
MongoDB: A NoSQL database used for data storage.
Here’s a brief overview of the docker-compose.yml file:

yaml
Copy code
version: '3.8'

services:
  server:
    build:
      context: .  # Current directory
    environment:
      NODE_ENV: production
      MONGO_URI: mongodb://mongo:27017/mydatabase
    ports:
      - 4001:4001
    depends_on:
      - mongo  # Wait for MongoDB service to start first

  mongo:
    image: mongo:latest
    container_name: mongo
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - 27017:27017

volumes:
  mongo-data:
Troubleshooting
MongoDB not connecting: Ensure that the MongoDB container is running, and the MONGO_URI in the .env file is correct.
Port already in use: If the port 4001 is already in use on your machine, change the PORT value in the .env file and update the docker-compose.yml accordingly.
Contributing
Feel free to fork this project and contribute by creating pull requests. To ensure smooth collaboration:

Fork the repository.
Create a feature branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

