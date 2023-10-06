import bcrypt from 'bcrypt';

bcrypt.hash('islaBlanca', 10, (error, hash) => {
    console.log(hash);
});
