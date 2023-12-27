# StreamSync : Advancing Streaming through webrtc and varied protocols 

This is the repo for BE final year project **Team No. 30** 
`StreamSync` is a livestreaming platform that allows users to stream directly form their browser.

**Team Members :** 
 - Parth Bhattad
 - Sahil Dahekar
 - Prathamesh Kirad 🍐

## Requirements 

 - Latest NodeJS version - `v20.10.0 (lts/iron)`
 - IDE ( VSCode recommended )

## Steps to Setup Locally 

 1. Fork the repo 
 > **Note** :  Remeber to **uncheck** the box saying fork only main branch
 
 2. Clone the repo locally 
```
git clone https://github.com/<username>/FinalYearProject.git
```
 3. Change directory to `backend` 
 ```
 cd backend
 ```
 4. Install packages and dependencies
  ```
 npm i
 ```
 5. Create a new `.env` file and fill all fields as per `.env.sample` file
  ```
 touch .env
 ```
 6. Start the server
  ```
 npm start
 ```
 7. Change directory to `frontend`
  ```
 cd ../frontend
 ```
 8. Install packages and dependencies
  ```
 npm i
 ```
 9. Start the frontend
  ```
 npm run dev
 ```

## Tasks To do

 - [ ] Display Single User Stream with Screen Share , cam , mic controls.
 - [ ] Write Backend to Stream this to `Youtube` using backend ( use `websockets` and `ffmpeg` )
 - [ ] Create Landing and Dashboard Pages in Frontend
 - [ ] Add Auth Functionality Keeping in mind different API integration optimization ( `OAuth` , `Clerk` , `Custom using Jwt and cookies` )
 - [ ] Add Support for other Streming platforms ( `Twitch` , `Facebook Live` )
 - [ ] Add Custom Layout Controls Functionality.
 - [ ] Add Support for Multi User Stream with a main Stream been admin host
 - [ ] Migrate to `NextJs` and containerize the project.
 - [ ] Deploy

## Pull Request Rules

 1. Create a Branch  of your first name that will be used to make pull requests.
 2. Be comfortable with merge conflicts.
 3. Use proper commits while pushing code.
 4. Create issues if found in the issues section
