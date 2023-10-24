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
  const queryStr = `SELECT r.*, IFNULL(vw.visuelWidth767, vw.visuelWidth1920) AS visuelRealisation FROM realisations r INNER JOIN ( SELECT tr.idRealisations, v.rankingVisuel, MAX(v.visuelWidth767) AS visuelWidth767, MAX(v.visuelWidth1920) AS visuelWidth1920 FROM themesrealisations tr INNER JOIN visuels v ON tr.idRealisations = v.idRealisation WHERE tr.idThemes = ? GROUP BY tr.idRealisations, v.rankingVisuel ) vw ON r.id = vw.idRealisations LEFT JOIN ( SELECT tr.idRealisations, MIN(v.rankingVisuel) AS minRankingVisuel FROM themesrealisations tr INNER JOIN visuels v ON tr.idRealisations = v.idRealisation WHERE tr.idThemes = ? GROUP BY tr.idRealisations ) minvw ON vw.idRealisations = minvw.idRealisations WHERE vw.rankingVisuel = minvw.minRankingVisuel ORDER BY r.rankingRealisation ASC`;

  query(queryStr, [themeId, themeId], callback);
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
