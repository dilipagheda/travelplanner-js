# About the project.
## Travel Planner

This is the 5th and a capstone project as part of Udacity front-end web developer nanodegree. It is about creating a travel planner app using HTML, CSS and plain Javascript , Node.js/Express and several public APIs.

The idea is that Node.js server will act as a middleware to protect the public API keys. Node server calls public APIs and fetches data which then gets transformed and sent back to front-end App. Front end app is written using plain javascript, SCSS, HTML which consumes this data and renders the information to user.

The fun part of this app is that user enters location such as Sydney and a travel date. App then displays country flag, country image, random facts about the country and weather information.

If the travel date is within next 7 days then only today's weather information is displayed.

If the travel date is beyond the 7 days then it shows today's weather and next 16 days's forecasted weather for the target location.

The goal of this project is also to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
- Jest testing
- Get the taste of Natural Language Processing

It also uses service workers for offline caching and webpack for setting up build process.

## Public APIs used
- Geonames
- Weatherbit
- Rest Countries
- Pixabay


# How to run this project locally

- Clone this repo to your local
- First run `npm install` in root folder

## Client
- Build your client using webpack prod config by running below command
  `npm run build-prod`

  This should create a `dist` folder with all the artefacts

## Server
- create `.env` file inside `./src/server`
- enter below api keys for these public APIs.
```
GEONAMES_USERNAME=<YOUR API KEY>
WEATHERBIT_APIKEY=<YOUR API KEY>
PIXABAY_APIKEY=<YOUR API KEY>

```
- Now, switch your current directory to ./src/server and run `node index.js`
- You should see the message on your server console as
`Example app listening on port 3000!`
- Now, go to browser and enter `https:localhost:3000`

# Test coverage using JEST

![img](https://github.com/dilipagheda/evaluate-news-nlp/blob/master/screenshots/jest_test_report.PNG)


# Home page - Screenshot

![img](https://github.com/dilipagheda/evaluate-news-nlp/blob/master/screenshots/homepage.png)
