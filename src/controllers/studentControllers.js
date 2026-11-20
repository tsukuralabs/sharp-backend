const connection = require('../config/db');
const db = require('../config/db');

const addEntries = (req, res) => {
    const { email, name } = req.body;
    const insertQuery = 'INSERT INTO Students (email, name) VALUES (?,?)';

    db.execute(insertQuery, [email, name], (err) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            connection.end();
            return;
        }
        console.log('Value has been inserted');
        res.status(200).send(`Student ${name} successfully added`);
    });
};

const updateStudents = (req, res) => {
    const { id } = req.params;

    const { name, email } = req.body;

    const updateQuery = 'UPDATE Students SET name= ?, email= ? WHERE id = ?';

    db.execute(updateQuery, [name, email, id], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            connection.end();
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Student not found');
            return;
        }
        console.log('Vallue has been updated');
        res.status(200).send(`Name updated to ${name} & ${email} `);
    });
};

const getStudentById = (req, res) => {
    const { id } = req.params;

    const getQuery = 'SELECT * FROM Students WHERE id = ?';

    db.execute(getQuery, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        if (result.length === 0) {
            return res.status(404).send('Student not found');
        }

        res.status(200).json(result[0]);
    });
};


const getStudentByName = (req, res) => {
    const { name } = req.query;

    const getQuery = 'SELECT * FROM Students WHERE name = ?';

    db.execute(getQuery, [name], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        if (result.length === 0) {
            return res.status(404).send('Student not found');
        }

        res.status(200).json(result);
    });
};

const deleteStudent = (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    // Validate ID
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).send('Invalid student ID');
    }

    // Validate email
    if (!email) {
        return res.status(400).send('Email is required');
    }

    const deleteQuery = 'DELETE FROM Students WHERE id = ? AND email = ?';

    db.execute(deleteQuery, [id, email], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send('Internal server error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found or email does not match');
        }

        return res.status(200).json({
            success: true,
            message: `Student with ID ${id} successfully deleted`
        });
    });
};

module.exports = { addEntries, updateStudents, getStudentById, getStudentByName, deleteStudent };