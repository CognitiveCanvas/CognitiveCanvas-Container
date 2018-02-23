CognitiveCanvas

This is the container webapp repo for webstrates.ucsd.edu.
Project Manager: Amy Fox
Participants: Michael, Xavier, Joshua


To run on local: 
1) Download repository
2) Do an npm install to install all the project dependencies
3) Establish a MongoDB instance named 'CognitiveCanvas'
4) <load data into database>
	mongoimport --db CognitiveCanvas --collection contents --file content.json 
	mongoimport --db CognitiveCanvas --collection keywords --file label.json 

5) npm start
6) navigate to start page defined in app.js




