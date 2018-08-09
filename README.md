# CognitiveCanvas

CognitiveCanvas is a Vue.js webapp which serves as a container for webstrates.ucsd.edu. CognitiveCanvas is an active learning tool which uses concept map to motivate students to note, organize, and memorize knowledge in a networked way. Through CognitiveCanvas, we hope to innovate the cognition of students towards knowledge points.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Download the repository to your local system.

### Install all the Project Dependencies

```
npm install
```

### Establish a MongoDB instance named 'CognitiveCanvas' & Load Data to Database (ATTENTION: The following 3 json files are loaded into 3 DIFFERENT database collections.)

#### Load Course Resourse Data (articles, blogs, etc)
```
mongoimport --db CognitiveCanvas --collection contents --file <Path to Your Local Repo>/server/asset/content.json
```

#### Load Keyword Data (Keyword to search for resources)
```
mongoimport --db CognitiveCanvas --collection keywords --file <Path to Your Local Repo>/server/asset/label.json 
```

#### Load User Data (authorized user)
```
mongoimport --db CognitiveCanvas --collection users --file <Path to Your Local Repo>/server/asset/authorized_user.json
```

### Start MongoDB

```
mongod
```

### Start the Server Side of Cognitive Canvas

navigate to the your local repository and execute following commands:

```
cd server
npm start
```


### Start the Client Side of Cognitive Canvas

navigate to the your local repository and execute following commands:

```
cd client
npm start
```

The CognitiveCanvas webapp should be accessible at port 8080 of local host. 

## Deployment

A deployed stable version of CognitiveCanvas is published at https://cogcanvas.ucsd.edu/ for now. Please noted that only authorized user are allow to login right now. 

## Authors

### Project Manager
* **Amy Fox**

### System Dev Team (Name Ranked by First Name)
* **Gaurav "Gav" Parmar**
* **Issac Fehr**
* **Michael Tolentino**
* **Xiangyu "Steve" Zhao**     
* **Xinwei "Xavier" Wang**
    
### User Interface Dev Team (Name Ranked by First Name)
* **Helen Cheng**
* **Joshua Tjong**






