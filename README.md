# fullstack-webpack
Tab tracker application. Based on [FreeCodeCamp tutorial](https://www.youtube.com/watch?v=Fa4cRMaTDUI)

Vue.js for front-end and Express.js for back-end.


## front-end quick start
Navigate to folder `/client`. Just `npm install` and `npm run dev`

## back-end quick start
Navigate to folder `/server`. First of all create your `.env` file with constants as next.
```
PORT=8081
MONGODB_URI=mongodb://localhost:27017/tabtracker
MONGODB_URI_TEST=mongodb://localhost:27017/tabtracker-test
JWT_SECRET="supersecret"
```

To run development mode you'll need MongoDB server running on your machine. Then execute `npm run seed`. After that `npm run dev`. And you're ready to go
