# The Employ Feedback Management System [[Live]](https://employ-feedback-management.herokuapp.com/employ/sign-up)

Employee Feedback Management System is an ERP platform where an Admin can add reviews to the employees in their organisation, based on their performance. 
The reviews given to an employee can be assigned to other employees by an Admin, who can give feedbacks on that review, suggesting the employee ways of 
improving his performance or appreciating it.

The platform is implemented using Node.js/Express.js alongside MongoDB as the database. The MongoDB Database has been hosted at Mongo Atlas and deployed using Heroku as a test
version for the purpose of viewing its basic functionality.

The Link for the same is :- https://employ-feedback-management.herokuapp.com/

A proper [video](https://youtu.be/uPLQR5Zl49U) guide for this can be found at this youtube link

**[Link](https://youtu.be/uPLQR5Zl49U)**

Steps for running this project :-
1. Clone this git repository, making sure you have Node and npm installed on your system.
2. Run the command `npm install`, to install all the dependencies to the system.
3. Create a MongoDB Atlas Cluster and replace the link to it with the `process.env.MONGO_ATLAS` in the mongoose [config](config/mongoose.js) file.
4. After setting the database change the `process.env.PASSPORT_SECRET` value at the [index.js](index.js) file as per your preferences.
5. If performed the above steps correctly the project should run perfectly without any errors.

## Key Features

#### 1. Passport Authentication

This library makes the usage of [`passport-local-strategy`](http://www.passportjs.org/packages/passport-local/) in the config [file](config/passport-local-strategy.js) with 
multiple types of User being implemented simultaneously. There are 2 types of users that shall exist in this system, namely, Employ and Admin. Each of them having a seperate 
local strategy defined for them, `admin-local` and `employ-local`. The function called 'session constructor', is used to differentiate between the 2 types of users, followed 
by **serialization** and **deserialization**.

Later on the same property is used to give and take access from the user based on his user type.

#### 2. Class Diagram

![image](https://github.com/the-wormhole/the-wormhole-Employ-Feedback-Management-System/blob/cd8bf1a60a652d4aa4ceee20d22eb511624d7994/Software%20Design%20and%20Architecture/Class%20Diagram%20image.png)

This diagram represents the class Architecture employed to design and model the system of the Employ Feedback management system. It shows how different models are related to 
each other, by specifying the aggregations and generalzations involved. This diagram was a part of the Software Development cycle that I sticked to, while developing this project.
This image file is a pictorial representation of the file [Class Diagram.mdj](https://github.com/the-wormhole/the-wormhole-Employ-Feedback-Management-System/blob/cd8bf1a60a652d4aa4ceee20d22eb511624d7994/Software%20Design%20and%20Architecture/Class%20Diagram.mdj), which can be opened in Star UML software.

A rough understanding of functionalities, and data stored in these models can be made by going through the 
[class.txt](https://github.com/the-wormhole/the-wormhole-Employ-Feedback-Management-System/blob/cd8bf1a60a652d4aa4ceee20d22eb511624d7994/Software%20Design%20and%20Architecture/classes.txt) 
file.

## Contributions

This project was made for the sole purpose of learning and improving on the BackEnd Development skills. If you liked the project, feel free to contribute to it, and star 
the repository. 
