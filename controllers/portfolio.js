/*export default (req, res) => {
    res.render('portfolio', { pageTitle: 'Portfolio', fullPage: false });
}*/
import query from '../database.js'; // Assurez-vous que cet import est correct

export default (req, res) => {
    query('SELECT nameTheme FROM themes ORDER BY rankingTheme ASC', [], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la requête');
            return;
        }

        const themes = results.map(row => row.nameTheme);
        res.render('portfolio', { pageTitle: 'Portfolio', fullPage: false, themes });
    });
};



