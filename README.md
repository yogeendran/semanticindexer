Project name: - OXYGEN

Description:-
The application “OXYGEN” is ontology driven intent indexer for web documents, so that you can find documents based on intent. 

Installation and Running:-
a.Container based running:
	Install Docker and Docker compose.
	Give the following commands to run in container
		1.npm install
		2.npm run build
		3.docker-compose  –f docker-compose-dev.yml build
		4.docker-compose  –f docker-compose-dev.yml  up
b.Non-Container based running:
	Install Neo4j, MongoDb, Redis, and RabbitMq in your machine and start all the servers
	 Give the following commands to run in container
		1.npm install
		2.npm run build 
		3.npm run www
		4.npm run search
		5.npm run crawl
		6.npm run parser

Technology stack:-
1. Platform: Nodejs
2. Frontend: Reactjs
3. Testing: Mocha-chai and Super-agent
4. Database: Neo4j and MongoDb
5. Message Queuing: RabbitMq
6. Caching and in-memory storage system: Redis
7. Container: Docker and Docker compose

Micro Services:-
•	Web app: www
•	Searcher
•	Crawler
•	Intent Parser

Ontology Elements:-
Domain: The subject in which you are going to search (JAVA) 
Concept: Topic under the domain (polymorphism)
Sub concept: Subtopic (Virtual Methods)
Intent: Intention or level of the search (Beginner)
Term: Word-describing intent in for or against (Introduction)
Web documents: API from google API’s  
