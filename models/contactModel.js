import query from '../database.js';
import { v4 } from 'uuid';

/***CREATE***/
export function addContact(data, callback) {
    const id = v4();
    const fullData = [id, ...data];
    query(
        'INSERT INTO contacts (id, lastName, firstname, email, message, creationDate) VALUES (?, ?, ?, ?, ?, ?)',
        fullData,
        callback
    );
};

/***READs***/
export function getAllContacts(callback) {
    query('SELECT * FROM contacts ORDER BY creationDate DESC', [], callback);
};

/***DELETE***/
export const deleteContact = (contactId, callback) =>{
    query(`DELETE FROM contacts WHERE id IN(?)`, [contactId], callback);
};

