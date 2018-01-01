# GoodForFood

*Goal*

Create a display of two graphs with the data in the excel file (data.xlsx), the graphs must represent:
                   - Wastage by item 
                   - Wastage by Service (breakfast, lunch dinner)



*Background Info*

This is a sample node/express app that renders ejs templates as the front end, and uses mongodb to store data

Please install the npm libraries required before running it - namely express,ejs,mongodb,d3 etc.
Please also set up mongodb on your local server (preferably port 27017)

The command to run it is "node server.js"

When run, it opens up two servers on the localhost - ports 3000 and 8080. 
3000 is used to view the data and is the access point for the UI.
8080 is where data is input and stored using queries. 

This app already has the basic features built in, the ability to recieve data 
from port 8080 and store it in the mongodb(sample query is in the code), and display 
the same data in a table format for each restaurant - retrieving the data by 
querying for the specific restaurant name, and displaying it on localhost:3000/rest/(name of restaurant here). 



*Detailed Instructions*

Your task can be split into two parts:

1. Understand this framework and how it works - input the data from the excel sheet into the mongodb
through the node app, similar to how it would recieve data from an external source (can do it manually, it's only 9 entries, no need to write a script here). For proof that this data has been recieved accurately - it should appear on the tables of the respective restaurants. 

2. Build upon this to add two graphs to the front end UI (index.ejs) - demonstrating wastage by item and wastage by service, above the table. d3.js can be used for data manipulation - to convert the raw data into a format understandable to plot graphs and plotly.js can be used to build the graphs (or any other module/method of your choice - these are only suggestions)