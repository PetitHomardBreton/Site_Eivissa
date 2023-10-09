import bcrypt from 'bcrypt';

bcrypt.hash('o5KYt$DKFiDq!oF4', 10, (error, hash) => {
    console.log(hash);
});
