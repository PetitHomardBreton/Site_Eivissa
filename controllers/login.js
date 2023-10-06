import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Importer le pseudo et le mot de passe depuis le .env
const admin_pseudo = process.env.ADMIN_PSEUDO;
const admin_password = process.env.ADMIN_PWD;

export function loginForm(req, res) {
    res.render('loginForm', { pageTitle: 'login' });
};

export function login(req, res) {
    const { pseudo, password } = req.body;

    // Vérification de l'existence du pseudo
    bcrypt.compare(pseudo, admin_pseudo, (error, isPseudoMatched) => {
        if (!isPseudoMatched) {
            res.render('loginForm', {  pageTitle: 'login', message: 'Identifiants incorrects' });
            return;
        }

        // Vérification du mot de passe si le pseudo est correct
        bcrypt.compare(password, admin_password, (error, isPasswordMatched) => {
            if (!isPasswordMatched) {
                res.render('loginForm', { pageTitle: 'login', message: 'Identifiants incorrects' });
                return;
            }

            req.session.isLogged = true;
            res.redirect('/logged');
        });
    });
}



        
