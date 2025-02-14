const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'mySecurePassword';

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error:', error);
  }
}

hashPassword();

async function comparePassword() {
  const inputPassword = 'mySecurePassword';
  const hashedPassword = 'yourStoredHashedPassword';

  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

comparePassword();

const password = 'mySecurePassword';

const salt = bcrypt.genSaltSync(10);
const hashedPasswordSync = bcrypt.hashSync(password, salt);

console.log('Hashed Password (Sync):', hashedPasswordSync);
