# Internal Apps

## Getting Started
The proposal of this document is to guide you in the implemented structure of Sequelize, and help you creating models, migrations and seeds.

### Technical References 

* [sequelize](https://www.npmjs.com/package/sequelize/)  - The ORM by itself, it constrols the data access
* [sequelize-cli](https://www.npmjs.com/package/sequelize-cli/) - This is used to orzanize the migrations and seeders, the **sequelize** by itself it is only the ORM, without **sequelize-cli** it is not possible to control the database migrations
* [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript/) - It is the **sequelize** in typescript version, used on model defitions, a cleanner way to define models with Annotations 
* [Documentation](http://docs.sequelizejs.com/) - For more information on seeds, migrations and commands you can have a great base here 

**PS:** There is a version called **sequelize-cli-typescript**, used to define migrations and seeders in TypeScript, we tried to use this package, but run into a lot of problems, and later dicover it doesn't seem to be maintained anymore, so we decided to stay with the javascript version, used basecally to create and run migrations and seeds.

### Folder Structure 

```
..
├── ...
├── db							
|	├── config
|	|	└── database.js			# A config file for environments
|	├── migrations				# Where all the migrations are stored
|	├── models
|	|	└── index.js			# It is used to instantiate the sequelize and connect the models to the database, it is alone here once all the models were developed using typescript
|	|── seeders					# Where all the seeds are stored
|	|── README.md
├── env
|	└── node.env				# Where the database information is registered, address, user, passwords etc
├── scripts
|	├── ...
|	|── run.sh					# Executed to start the service, and where the migration and seeds are applied, as the database is installed in another container, we do need to wait until it is up, this is why we need the bash bellow
|	|── wait-for-it.sh			# Verify and respond when database is up
|	├── ...
├── src
|	├── ...
|	├── models
|	|	└── ...					# Here stays the typescript models, the ones that defines the database
|	└── ...
├── ...
├── .sequelizerc				# A config file for sequelize-cli, let you specify migrations, seeds and model locations
└── ...
```

### Database basic objects 
Sequelize uses two tables to control the *migrations* and *seeds* that need to be applied, if it is not in these tables they will be applied.

* SequelizeMeta - Register the *migrations* applied
* SequelizeSeed - Register the *seeds* applied

### Basic commands
 - `npx sequelize --help`: to get help and see command's details
 - `npx sequelize db:migrate`: to apply all the pending migrations
 - `npx sequelize db:seed:all`: to apply all the pending seeds
 - `npx sequelize migration:generate`:  to generate new migrations
 - `npx sequelize seed:generate`: to generate new seeds
 - `npx sequelize model:generate`: **this one will not be used**, as we are using *sequelize-cli* the JS version will create JS models, and our projects use TS models, so new models must be manually created on *src/models*

**Attention**
 - The timestamp, as a prefix on the js files, is the way sequelize controls the order of execution.
 - Always execut from the root folder, because sequelize looks for the *.sequelizerc* file on the current directory

## Creating new model

Steps:

 - Define your model on *src/models*
 - Create your migration
	 - `npx sequelize migration:generate --name create_<ENTITY NAME>`
	 - it is a good practice to use *create* as a prefix as later you can alter this object
 - Open the created migration and now, define your model as you made on the first step. For more information look at the documentation provided
 - Apply your migration:
	 - `npx sequelize db:migrate`

## Altering an old model

Steps:

 - Upder your model on *src/models*
 - Create your migration
	 - `npx sequelize migration:generate --name alter_<ENTITY NAME>`
 - Open the created migration and now, define your model as you made on the first step. For more information look at the documentation provided
 - Apply your migration:
	 - `npx sequelize db:migrate`

## Execute commands on docker environment

Running sequelize code can be hard if you are off a docker environment, so I recomend put everything you need up, and than execute your migrations comands inside the container, lets use mlk-auth as example:

    $ docker-compose up mlk-auth 
    
When it is up, on a new terminal you can do:
    
    $ docker exec -it mlk-auth /bin/bash
    # npx sequelize db:migrate

In this way you don't need to change any configuration, just run your commands.

