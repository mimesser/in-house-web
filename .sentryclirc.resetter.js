const fs = require('fs');

try {
  fs.copyFileSync('.sentryclirc.template', '.sentryclirc');
  console.log('sentry-config reset successfully');
} catch (err) {
  console.log("couldn't reset sentry config");
}
