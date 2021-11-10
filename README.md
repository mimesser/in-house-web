# in-house-web

## Global dependencies and tools
Node.js and npm https://nodejs.org/en/
You might want to use *nvm* for managing node/npm versions: 
Installing using curl: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
Installing using wget: `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

## Ensure you're using a compatible node/npm version
`nvm use`

## Install dependencies
`npm install`

## Create a .env.local file in the root project folder and add the following lines:
`
ENV=localdevelopment
SENTRY_TOKEN=PLEASE_ASK_FOR_THE_TOKEN
`

## Building project 
`npm ci`

## Running locally
Start local web server in dev mode (with hot reloading) pointing to the staging back-end in dev environment   
`npm run start:dev`   

## Work In Progress

## Testing
...

## Storybook
Useful for rapid components development/showcase but not only https://storybook.js.org/  
`npm run storybook`
