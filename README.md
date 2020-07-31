# in-house-web

## Global dependencies and tools
Node.js and npm https://nodejs.org/en/
  
## Install dependencies
`npm install`

## Create a .env file in the root project folder and add the following line:
`
API_URL=https://ih-dev-api.azurewebsites.net/api
`

## Building project 
`npm ci`

## Running locally
Start local web server in dev mode (with hot reloading) pointing to the staging back-end in dev environment   
`npm run next:dev`   

## Running tests
Our test framework is Jest https://jestjs.io/  
Run tests once: `npm run test`  
Run tests in watch mode: `npm run test:watch`  
Get coverage: `npm run coverage`  

## Storybook
Useful for rapid components development/showcase but not only https://storybook.js.org/  
`npm run storybook`
