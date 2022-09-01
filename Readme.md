# Node-instaTable

This project was created with the intention of creating a simple and easy to use expantion of sequelize to search and filter data from a database.

## Installation

yarn add node-instatable

## Usage

```js
const { InstaTable } = require('node-instatable');
InstaTable.init(sequelize, { /* options */ });

squelizeModel.search('search string')
// returns a sequelize query object
sequelizeModel.paginate(1, 10) 
// returns an object with the data and the total count of the query
```

```