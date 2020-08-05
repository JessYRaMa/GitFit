# GitFit
GitFit by JessYRaMa. Check out our individual GitHub Repositories!<br>
[Jessica Vaiana-Cavanagh](https://github.com/jessicavc)<br>
[Yssabel Pangilinan](https://github.com/YPangilinan)<br>
[Rafael J](https://github.com/Raffaj1208)<br>
[Marc Martinez](https://github.com/MarcM987)


## Project Description
<p>Welcome to GitFit! Your newest fitness tracker! On our site you can create a profile with your age, height, and weight and try one of two things, the BMI Calculator, or our Weight Logger. When you use our Weight Logger, it will create a user profile in our database with the information you provided and a graph based on that data (using chart.js). There will also be inputs for you to log/edit/delete other dates and weights and the chart will update accordingly. </p>

<img width="1293" alt="Screen Shot 2020-07-26 at 5 37 06 PM" src="https://user-images.githubusercontent.com/61812035/89473424-a931ae80-d737-11ea-8d1a-8fbb6a0d0cb1.png">

### See it in action!
*GitFit* is deployed to Heroku. Please check it out [here](https://gitfit-jessyrama.herokuapp.com/)

### Our Motivation
Quarantine 2020 inspired us to create this app. Throughout this time, we've been eating more and working out less. We were motivated to create something that would motivate us to get back on track with our fitness in a fun and creative way. 

### How was this app created?
The technologies used to create this app are:
- JavaScript
- jQuery
- node.js
- Express.js
- Chart.js
- HTML
- Bootstrap

### Want to run it locally?
To install the application follow the instructions below:

	git clone git@github.com:JessYRaMa/GitFit.git
	cd GitFit
	npm install
This should install the necessary packages from the Package.JSON needed for this application. 

In the terminal,run the Node.js application with the command below.

	node server.js
	
The application will now be running locally on `PORT`, in this case that is port 3000. You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:3000`.

### Project Instructions/Requirements
Your project must:
* Use a Node and Express Web Server;
* Be backed by a MySQL Database an ORM (not necessarily Sequelize);
* Have both GET and POST routes for retrieving and adding new data;
* Be deployed using Heroku (with Data);
* Utilize at least one new library, package, or technology that we haven’t discussed;
* Have a polished frontend / UI;
* Have folder structure that meets MVC Paradigm;
* Meet good quality coding standards (indentation, scoping, naming).
* Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md
