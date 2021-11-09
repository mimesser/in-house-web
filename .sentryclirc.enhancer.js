const fs = require('fs');

try {
  let token_found = false;

  fs.readFile('.env.local', function (err, file) {
    if (err) throw err;

    const lines = file.toString().replace(/\r\n/g, '\n').split('\n');

    for (let line of lines) {
      const [prop, val] = line.split('=');

      if (prop === 'SENTRY_TOKEN') {
        try {
          fs.appendFileSync('.sentryclirc', `token=${val}\n`);
          console.log('Successfully added Sentry token to sentryrc-file!');
        } catch (err) {
          console.log("Whoopsie, couldn't attach sentry token to .sentryclirc!");
          console.log(err);
        } finally {
          token_found = true;
        }
      }
    }
    if (!token_found) {
      console.log('Cannot find SENTRY_TOKEN in your .env.local!!!');
    }
  });
} catch (err) {
  console.log(
    "Couldn't read .env.local ... does it exist? You'll need it with the valid SENTRY_TOKEN entry",
  );
}
