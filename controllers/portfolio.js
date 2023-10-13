import query from '../database.js'; // Assurez-vous que cet import est correct

export default (req, res) => {
    // Première requête pour obtenir les thèmes
    query('SELECT nameTheme FROM themes ORDER BY rankingTheme ASC', [], (errorThemes, resultsThemes) => {
        if (errorThemes) {
            console.error(errorThemes);
            res.status(500).send('Erreur lors de la requête des thèmes');
            return;
        }

        const themes = resultsThemes.map(row => row.nameTheme);

        // Deuxième requête pour obtenir les réalisations
        query('SELECT realisations.*, visuels.visuelWidth575 FROM realisations JOIN visuels ON realisations.idVisuelPrincipal = visuels.id ORDER BY rankingRealisation ASC', [], (errorRealisations, resultsRealisations) => {
            if (errorRealisations) {
                console.error(errorRealisations);
                res.status(500).send('Erreur lors de la requête des réalisations');
                return;
            }

            res.render('portfolio', {
                pageTitle: 'Portfolio',
                fullPage: false,
                themes,
                realisations: resultsRealisations
            });
        });
    });
};