const jwt = require('jsonwebtoken');


function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };
  const secretKey = 'K12';  


  const token = jwt.sign(payload, secretKey);

  console.log('JWT Token:', token);


  return token;
}


const jwtToken = createJWT();


function verifyJWT(token) {
  const secretKey = 'K12';  

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
    } else {
      console.log('JWT Verified. Decoded:', decoded);
    }
  });
}


verifyJWT(jwtToken);


function decodeJWT(token) {
  const decoded = jwt.decode(token);

  console.log('Decoded JWT:', decoded);
}


decodeJWT(jwtToken);
