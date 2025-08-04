// Generate secure secret for NextAuth
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('base64');
console.log('Your NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nCopy this value to your .env.local file');
