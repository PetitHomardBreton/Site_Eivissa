import query from "../database.js";
import { v4 } from "uuid";

/***CREATE***/

export const createThemeRealisationLink = (
  themeId,
  realisationId,
  callback
) => {
  const id = v4();
  query(
    `INSERT INTO themesrealisations (id, idThemes, idRealisations) VALUES (?, ?, ?)`,
    [id, themeId, realisationId],
    callback
  );
};

/*** READ ***/

export const getRealisationsByTheme = (themeId, callback) => {
  // D'abord, obtenez le nom du thème en utilisant l'ID du thème
  const themeNameQuery = 'SELECT nameTheme FROM themes WHERE id = ?';

  query(themeNameQuery, themeId, (errorThemeName, results) => {
      if (errorThemeName) {
          callback(errorThemeName, null);
      } else {
          const themeName = results[0]?.nameTheme;
          // Vérifiez si le nom du thème est "Showreel"
          if (themeName === "Showreel") {
              // Si c'est le cas, renvoyez un tableau vide pour ne rien afficher
              callback(null, []);
          } else {
              // Sinon, exécutez la requête comme avant
              const queryStr = `SELECT r.*, IFNULL(vw.visuelWidth767, vw.visuelWidth1920) AS visuelRealisation
              FROM realisations r
              LEFT JOIN (
                  SELECT tr.idRealisations,
                         MIN(v.rankingVisuel) AS minRankingVisuel
                  FROM themesrealisations tr
                  INNER JOIN visuels v ON tr.idRealisations = v.idRealisation
                  WHERE tr.idThemes = ?
                  GROUP BY tr.idRealisations
              ) minvw ON r.id = minvw.idRealisations
              LEFT JOIN visuels vw ON vw.idRealisation = minvw.idRealisations AND vw.rankingVisuel = minvw.minRankingVisuel
              WHERE vw.rankingVisuel = minvw.minRankingVisuel
              ORDER BY r.rankingRealisation ASC`;

              query(queryStr, themeId, callback);
          }
      }
  });
};


/*** Delete ***/

// Supprimer les associations pour une réalisation donnée
export const deleteThemesForRealisation = (realisationId, callback) => {
  query(
    `DELETE FROM themesrealisations WHERE idRealisations = ?`,
    [realisationId],
    callback
  );
};
