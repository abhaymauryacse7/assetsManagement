#Full stack Home Assignment

This simple CRUD application will help manage assets in the warehouse.

##Stack Versions
I have used following versions to develope the application:     
* node(server): v16.14.2
* node(front end): v14.19.3
* MySQL(database): v8.0.29


##Demo
Here is a small application demo: [Check Demo](https://drive.google.com/file/d/1ye5ozFc86e5FbohGw8zzbPuWNXvO6EO6/view?usp=sharing)

##How to setup the project
* Simply pull the project directory.
* Server directory is "asset-manager-api" and front end directory is "asset-manager-ui"
* Once you have both of them locally on your system, run ```npm install``` in server root and ```yarn install``` in front end root to install dependencies.
* You will find a "script" folder in the root of the server project. It contains 3 sql scripts, they need to be run one by one in the database. It will create a new database, a new database user and 3 mockup assets entries in the database.
* Please note that the scripts create a database named as "assets_system" and a database user named as "assets_manager_api" so if you already have that database or database user, please feel free to change it.
* In order to minimize the setup work, I have pushed the ".env" file as well that contains the environment variables but in reality that file will need to be generted manually when setting up the project.
* If you have changed the database name or user, you will need to make the same change in ".env" file as well.
* Once dependencies are installed, you can run server by ```npm start``` and front end by ```yarn start```

##Important things to note:
* I have not used ORM in the server because using the queries directly speeds up the query execution.
* I have created one additional route GET "/:id", i.e. get asset by id, which is not used but it is standard to create a get by id route when creating CRUD application. It will come in handy if assets grow big and contains more than just 3 propeties, to show its details in an separate popup or page.
* Disabling of a button when the requirements are not met, can lead to confusion as user might not understand what else they are suppose to do, to enable a save or edit button. I believe user should be able to take actions and then make aware of the mistaked they did in order for them to correct it and retake the action. That is why in this application, users will be able to submit the add or edit form, and will be flashed with the errors if necessary.

##Industry Quality Code
There are multiple things that have been taken into consideration when developing code for this application, to make it industry quality code:
* Do not show the list of assets when it is empty, instead show a simple message
* Show the list of assets with pagination to decrease the load time. When assets list grow big, it is essential that you do not take more than a few milisecond to load the list. That can only be achieved by pagination.
* Pagination should be server side, or else it does not serve the purpose.
* When editing an asset and not changing anything, the save should not send an API request, instead it should inform user that they have not yet changed any properties of the asset. This will decrease the chance of API abuse.
* User should be made aware of all required fields when tring to update or add an asset, if some of them were left empty.
* User should be able to pick up custom colors, not only standard ones.
* Serial number is unique, i.e. two assets can not have same serial numbers.
* Meta data is automatically generated on the server side to make sure that it can be used to differentiate between two assets or between the two versions of the same asset.

##Technologies Used
* The server side code is writted with nodeJs + typescript.
* The UI code is writted with React + typescript.
* I have used REDUX to manage the state tree.
* I have used React Saga to manage the side effects.
* The UI is capable of using multiple language translations if required.
* The UI is capable of creating tests for each component. However, I have omitted the tests due to the time limitation.

##Time Taken
It has taken me in total of 28 hours to develope this application. I had to time my hours because I knew I will not be able to finish the project under the span of a week due to my limited spare time per day.