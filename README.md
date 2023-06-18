# Live Coding

### Description
This is a live coding web application designed to facilitate remote mentorship sessions between mentors and students. The application allows mentors to view their student while coding, observe real-time code changes, and provide guidance.

### Installation
To install Live-Coding, follow these steps:

Clone this repository to your local machine.
Navigate to the server directory of the project.
Install the dependencies by running the command 'npm run setup-production'.
Run the command 'node ./dist/server' to start the application.
Navigate to localhost:5000 in your browser and enjoy.

### Deployment

this project is up and running using render.com and can be accessed in the following link:  

https://online-coding.onrender.com

The list of usernames & passwords can be found in ./server/MOCK_DATA_USERS.json

### Usage
Once you have installed Live-Coding, you can use it by following these steps:

- Mentor has to login and reach the Lobby page
- The Mentor has choose a code block and then a student.
- Once he click on the student, a link to the codeblock page will be generated
- The Mentor can copy the link and send it to the student
- Once the student enters the link, he/shw will have to login as well and then redirect automatically to the code block page.
- Then, the student can write the code and the Mentor can view it live with read-only permission.  

### Technologies
Online Coding was built using the following technologies:

#### Back-end
- Typescript
- NodeJs
- Express
- JWT
- MongoDB
- Socket-io

#### Front-end
- Typescript
- React
- React-router-dom
- Redux toolkit
- socket-io-client
- styled components


### Contact
If you have any questions or concerns, please feel free to contact me.