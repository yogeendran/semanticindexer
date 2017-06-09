Project name: - OXYGEN

Description:-
The application “OXYGEN” is ontology driven intent indexer for web documents, so that you can find documents based on intent. 

Installation and Running:-
Container based running:
	Install Docker and Docker compose.
	Give the following commands to run in container
		npm install
		npm run build
		docker-compose  –f docker-compose-dev.yml build
		docker-compose  –f docker-compose-dev.yml  up
Non-Container based running:
	Install Neo4j, MongoDb, Redis, and RabbitMq in your machine and start all the servers
	 Give the following commands to run in container
		npm install
		npm run build 
		npm run www
		npm run search
		npm run crawl
		npm run parser

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
