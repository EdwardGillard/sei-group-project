# ** SEI Project three: KEBB Bazaar**

## https://kebb-bazaar-clothes.herokuapp.com/

## **Overview**

Project 3 was my first experience of putting together a full stack app as part of a team. We started off by picking a shortlist of ideas which we collaborated in expanding and then made a group decision on the best option for us. The unanimous decision resulted in **KEBB Bazaar**. From there we created a wireframe using *miro.com*. 

*KEBB Bazaar* is a clothes rental app, inspired by Hurr collective, created in **MERN stack** in 7 days. During the course of the project week I worked in frontend and backend development during this project and thoroughly enjoyed my first official experience in full stack development. 

----------------------

## **Brief.**

#### Project brief:

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.

---------------------

## **Technologies used.**

#### Backend:

* Node.js
* MongoDB
* Express
* Bcrypt
* Body-parser
* Mongoose
* jsonwebtoken

#### Frontend:

* React / React Router Dom
* Axios
* Bulma
* SCSS
* http-proxy-middleware
* React Select
* React slideshow
* React star rating
* React Map GL
* React notify toast
* React input range

#### Development tools.
* Npm/ Nodemon
* Git
* Github
* Google Chrome dev tools
* Eslint linter

--------------------

## **Approach.**

At the beginning of the project we split our team of four into two pairs. My self and my colleague Blanca took the back end. Once completed we moved onto front end to help bring the controllers we had created to life. 

### Back End.

#### Models:

A crucial part of the *KEBB* backend was our models. We created 4 main Schemas using **Mongoose**. We utilized *Mongoose's* capabilities to provide each schema with either **Embedded Schemas** or **Virtual Schema properties** to build complex schemas that supply the front end with comprehensive **APIs**. 

The most *complex schema* was the user schema. We wanted to focus on the user experience in our app so we tried to include as much functionality to the user schema as possible. We nested several sub schemas onto the main schema to for the map pins, ratings and comments. I created 3 arrays referencing other schemas to create a favourites feature for friends, posts and articles of clothing. I also created two virtuals to make a collection of any posts or clothing added by the user and one virtual to create a password confirmation field to help validate the password on registration. 

Using *mongoose* and *bcrypt* we manipulated incoming authorization requests to compare with the virtual confirmation and encrypt the users password. We also transformed the JSON response to prevent the email address and password being included in the responce back to the client. 

#### Controllers:

I went a bit overboard with creating functions on the controllers I was enjoying it *THAT* much. We started off with basic functions to handle simple *CRUD* requests on the clothing and authorization so that our colleagues focusing on the front end could begin building React pages. For the login function we used the *JSON web token* dependency to create a user token so that we could ensure secure functionality on other aspects of the app. 

Myself and my partner worked together to console log our way through creating our private messages controllers as it was a slightly more complex concept than other controllers we had previously built. We went for the approach of creating an inital message to generate an id that we could then build an array of responses on. We used the Id of the current user and the target user to ensure that they were the only two users authorized to see the messages. 

Initally we created an inbox and outbox get request however when attempting to use it on front end I realised that it would be more efficient to concatenate the two together so that the front end could be seens as combined incoming and outgoing chats. 

Once the backend had hit MVP point we moved onto front end too, however, there was a few points I had to return back to create a new function to implement something I was trying to achieve on front end. One of those and possibly my biggest win on the whole project came when I created the delete function. I initally thought it would be a relatively simple function to build however I quickly realised whilst testing on front end that it wasnt a simple case of deleting the user profile. It then dawned on me after causing an error that I needed to not only delete the user profile but the entire trace of the user. I achieved this by using a secure route to attain the user's token then search anything that the user has created. I then used a forEach statement to cycle through each search and delete them.

Another key aspect of controllers that I undertook was the testing of all controller functions. I did two stages of testing. Firstly, I performed an initial test to ensure the controller is working efficiently. Secondly I went through error handling to improve our JSON responses to be as clear as possible when required. I used commenting to signify that  
both checks had been completed. 

---------------------

### Front End.

By the time we had finished back end just before the half way point of the project week a fair amount of work had been done on front end. This was my first proper developer moment coming into a situation where I was confronted by a bunch of code I hadn't written and trying to understand and catch up. It was also interesting to help the guys who had been on front end with things they were struggling with. It was another first looking at their code and helping them figure out what wasn't working and using my knowledge of what was built on the back end to aid them from that perspective. 

#### Comments:

One of the first things I did when I moved onto the front end was to start building comments functions on users and clothes. I did this by adding a new component to our common folder that can be reused by users, clothing and posts. I then proceeded to use *Axios* to send **CRUD** requests. Finally I used my axios requests to create, retrieve and delete comments on various parts of the app. This was done by using React's onChange facility to set the state then sent snippets from the state to the backend. 

#### Posts: 

Similar to the processes used in the above section I used *Axios* and the RESTful routes on the backend and built a functioning posts section. Starting with index and show pages at first then moving onto create, update and delete. 

#### Troubleshooting and finishing touches:

Alot of the stuff I have done on front end has been centered around trouble shooting, error handling and testing. I used *React notify toast* to add toast responses where neccisary to update the user with a visual response. If I encountered something else that needed attention I added a note to my chaotic desk covered in post-it notes and returned to it later.

Another key part of my front end journey has been helping my colleagues if they have been struggling or taking over a task entirely if they wanted to focus on something they were less frustrated with.

-------------------------

## **Bugs.**

At this point, after alot of testing and trying cause errors, I havent noticed many bugs in the final app. I am however aware of an issue of returning the state back to empty on submission of a private message. I am also aware of an issue with changing the profile picture.

-------------------------

## **Wins and Issues.**

#### Wins:

This project was a rollercoaster. There were alot of big relieving moments when a certain angle I was attempting to resolve an issue was sucessful. 

As mentioned in the backend section above one of my big wins on this project was working between front and back end to create a full account delete function that removed all traces of a user to prevent causing errors in any posts they may have created. This function was more tricky than much of the basic RESTful actions we have learnt and it was fun console logging my way through. 

The biggest win of all for me was collaborating well in a team of big personalities in a time pressured project. It was a positive experience for my first group collaboration. 

#### Hurdles: 

Looking back over previous projects the hurdles now seem less daunting. Most of the hurdles I encountered were fiddly little bits which I eventually resolved. There are no particular hurdles that spring to mind.

One hurdle we experienced as collective were issues with *github*. We got together every time we were due a push to the development branch to handle merge clashes as a team. However the issues we encountered seemed to come without logic. 

Another hurdle we faced as a team was styling in *SCSS* with *bulma* present. It's something we have all grown more comfortable trouble shooting however sometimes the bulma seemed to have a hold on the whole project as it took a little while to resolve. 





