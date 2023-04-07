# Node.js project: NUESA Dev's Backend Project
## Overview
This is a Node.js project that provides user authentication and a news system that has a post/comment system. The authentication mechanism was implemented using passport local strategy and google oauth provider with sessions, the post/comment system was implemented using Mongoose.

## Getting Started
To get started clone the repository to your personal computer using this code:
Clone the repository: git clone https://github.com/tezon22/NUESA1.10.git
To install all the dependencies used in the project
npm install
To run the application, you need to configure the environment file by creating a .env file with this variables
SESSION_SECRET: a secret string used to sign the session cookie
GMAIL_USER: the email address of the administrator of the application for the reset password implementation
GMAIL_PASSWORD: the password of the administrator of the application(an App password) for the reset password implementation

## Running the application
To start the application server, run the following command:
npm start
This will start the application and connect to the database and listen on the configured port

## User Section
### Registration
To register a new user, go to the registration page at /users/register and fill in the registration form. The form requires a username which will be your email because passport requires a username and password as the fields to be used, then the users first Name and password. Once the form is submitted, the user will be redirected to the login page. Or a user can register instead using the google provider.
### Login
To log in, go to the login page at /users/login and enter your username which will be your email and password. If the credentials are valid, you will be redirected to the home page.
### Logout
To log out, click the logout button in the navigation bar. This will destroy the session and redirect the user to the login page.
### Reset Password
For a user to reset their password, go to the Reset Password page at /reset-password which will require the registered user's username which is their email address. An email which will contain a token created by the crypto module will be sent to the user's email address. When the user clicks the reset password button the token will be sent back to the server then the user's new password will be requested then resetted. The new password will then be saved in the database using mongoose.

## Post/Comment System
The application has a post/comment system where registered users can post comments and comment replies under a post made by the administrator. The post and comment are stored in the database using mongoose.
### Creating a Post
To create a new news post, an administrator has to login and navigate to the create post page at /post and fill in the form. The form requires a title, content, and an optional image upload. Once the form is submitted, the post will be saved to the database and the administrator user will be redirected to the post page with the newly added post.
### Commenting on a post
On the post page, registered users can leave comments on the post. Each comment includes the commenter's first name, the comment text, and a timestamp. To leave a comment, fill in the comment form on the post page and click the submit button. The comment will be saved to the database and displayed on the post/comment page.
### Replying to a comment
Registered users can also reply to comments on the post. Each reply includes the replier's first name, the reply text, and a timestamp. To reply to a comment, click the reply button below the comment and fill in the reply form. The reply will be saved to the database and displayed below the comment.

## Technologies Used
Node.js
Express
MongoDB
Passport.js

## Contributors
@Davheed2 - uchennadavid2404@gmail.com
@
@

## Contributing 
Pull requests are welcome. For major changes on the project, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.



License
MIT (https://choosealicense.com/licenses/mit/)