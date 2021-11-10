const fs = require('fs');

try {
  fs.readFile('.env.local', function (err, file) {
    if (err) throw err;

    const lines = file.toString().replace(/\r\n/g, '\n').split('\n');
    const token = lines.find((l) => l.split('=')[0] === 'SENTRY_TOKEN').split('=')[1];
    const env = lines.find((l) => l.split('=')[0] === 'ENV').split('=')[1];

    if (!token) {
      console.log('Cannot find SENTRY_TOKEN in your .env.local!!!');
      return 1;
    }

    if (!env) {
      console.log('Cannot find ENV variable with "localdevelopment"-value in .env.local');
      return 2;
    }

    try {
      if (env === 'localdevelopment') {
        fs.appendFileSync('.sentryclirc', `token=${token}\n`);
        console.log('Successfully added Sentry token to sentryrc-file!');
        return 0;
      }
    } catch (err) {
      console.log("Whoopsie, couldn't attach sentry token to .sentryclirc!");
      console.log(err);
      return 3;
    }
  });
} catch (err) {
  console.log(
    "Couldn't read .env.local ... does it exist? You'll need it with the valid SENTRY_TOKEN entry",
  );
  return 4;
}
