# Node.js Rest APIs with Express, Sequelize & MySQL example

{
"code": 201,
"message": "trip_created",
"description": "The trip is created successfully.",
"trip": {
"id": "620f26ad9ba7360496bc1be7",
"name": "Test Delivery",
"description": "item pickup for test users",
"trip_state": "created",
"total_distance": 0,
"total_duration": 0,
"total_elevation_gain": 0,
"metadata": {
"_id": 21,
"order_id": "1123"
},
"start_location": {},
"end_location": {},
"user": {
"id": "61ffb486d2c69840ee518073",
"name": "",
"description": "1200",
"metadata": {
"Mobile": "1234567890",
"Name": "Nikhil"
}
},
"started_at": null,
"ended_at": null,
"created_at": "2022-02-18T04:55:09.660",
"updated_at": "2022-02-18T04:55:09.660",
"events": [],
"stops": [
{
"id": "620f26ad9ba7360496bc1be5",
"name": "Delivery",
"description": "test Pickup for Johan",
"metadata": {
"order_id": "1120"
},
"address": "Flat NO 121 MG road ",
"geometry_radius": 20,
"geometry": {
"type": "Point",
"coordinates": [
77.6879689,
27.4072289
]
},
"created_at": "2022-02-18T04:55:09.658",
"updated_at": "2022-02-18T04:55:09.658",
"arrived_at": null,
"departed_at": null
},
{
"id": "620f26ad9ba7360496bc1be6",
"name": "Delivery",
"description": "another tester Pickup for Johan",
"metadata": {
"order_id": "1129"
},
"address": "teacher colony ",
"geometry_radius": 200,
"geometry": {
"type": "Point",
"coordinates": [
77.6925657818137,
27.422398561298454
]
},
"created_at": "2022-02-18T04:55:09.659",
"updated_at": "2022-02-18T04:55:09.659",
"arrived_at": null,
"departed_at": null
}
]
}
}

For more detail, please visit:
> [Build Node.js Rest APIs with Express, Sequelize & MySQL](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

> [Build Node.js Rest APIs with Express & MySQL (without Sequelize)](https://www.bezkoder.com/node-js-rest-api-express-mysql/)

> [Node.js Express File Upload Rest API example](https://www.bezkoder.com/node-js-express-file-upload/)

> [Server side Pagination in Node.js with Sequelize and MySQL](https://www.bezkoder.com/node-js-sequelize-pagination-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://www.bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Front-end that works well with this Back-end
> [Axios Client](https://www.bezkoder.com/axios-request/)

> [Angular 8](https://www.bezkoder.com/angular-crud-app/) / [Angular 10](https://www.bezkoder.com/angular-10-crud-app/) / [Angular 11](https://www.bezkoder.com/angular-11-crud-app/) / [Angular 12](https://www.bezkoder.com/angular-12-crud-app/) / [Angular 13](https://www.bezkoder.com/angular-13-crud-example/) / [Angular 14](https://www.bezkoder.com/angular-14-crud-example/) / [Angular 15](https://www.bezkoder.com/angular-15-crud-example/) / [Angular 16 Client](https://www.bezkoder.com/angular-16-crud-example/)

> [Vue 2 Client](https://www.bezkoder.com/vue-js-crud-app/) / [Vue 3 Client](https://www.bezkoder.com/vue-3-crud/) / [Vuetify Client](https://www.bezkoder.com/vuetify-data-table-example/)

> [React Client](https://www.bezkoder.com/react-crud-web-api/) / [React Redux Client](https://www.bezkoder.com/react-redux-crud-example/)

## More Practice

Security:
> [Node.js Express: JWT example | Token Based Authentication & Authorization](https://www.bezkoder.com/node-js-jwt-authentication-mysql/)

Associations:
> [Sequelize Associations: One-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://www.bezkoder.com/sequelize-associate-many-to-many/)

Fullstack:
> [Vue.js + Node.js + Express + MySQL example](https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/)

> [Vue.js + Node.js + Express + MongoDB example](https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/)

> [Angular 8 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-node-express-mysql/)

> [Angular 10 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-10-node-js-express-mysql/)

> [Angular 11 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-11-node-js-express-mysql/)

> [Angular 12 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-12-node-js-express-mysql/)

> [Angular 13 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-13-node-js-express-mysql/)

> [Angular 14 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-14-node-js-express-mysql/)

> [Angular 15 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-15-node-js-express-mysql/)

> [Angular 16 + Node.js + Express + MySQL example](https://www.bezkoder.com/angular-16-node-js-express-mysql/)

> [React + Node.js + Express + MySQL example](https://www.bezkoder.com/react-node-express-mysql/)

Integration (run back-end & front-end on same server/port)
> [Integrate React with Node.js Restful Services](https://www.bezkoder.com/integrate-react-express-same-server-port/)

> [Integrate Angular with Node.js Restful Services](https://www.bezkoder.com/integrate-angular-10-node-js/)

> [Integrate Vue with Node.js Restful Services](https://www.bezkoder.com/serve-vue-app-express/)

## Project setup
```
npm install
```

### Run
```
node server.js
```
