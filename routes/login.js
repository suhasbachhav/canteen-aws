
/**
 * @swagger
 * tags:
 *   name: login
 *   description: The login managing API
 * /login:
 *   post:
 *     summary: Create a new entry for login
 *     tags: [login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 uname:
 *                    type: string
 *                 psw:
 *                    type: string
 *     responses:
 *       200:
 *         description: The login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       404:
 *         description: Invalid Login details
 *       400:
 *         description: Please enter Username and Password!
 */

import express from 'express';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

import returnResultSet from '../utils/db.js';

const login = express.Router();


login.post('/', async function (req, res) {
	const username = req.body.uname;
	const password = md5(req.body.psw);
	if (username && password) {

		try {
			const results = await returnResultSet('SELECT * FROM users WHERE status = 1 AND username = ? AND password = ?', [username, password]);

			if(!results.length){
				res.status(404).json({ message: 'Invalid Login details' })
			}
			const token = jwt.sign({
				Uid: results[0].id,
				foodservice: results[0].foodservice,
				username: results[0].username,
				vendor: results[0].vendor
			}, 'q2w3e4r5t6y7u8i9', { expiresIn: '24h' });
			

			/* req.session.loggedin = true;
			req.session.Uid = results[0].id;
			req.session.foodservice = results[0].foodservice;
			req.session.username = results[0].username;
			req.session.vendor = results[0].vendor;
			const timestamp = new Date().toISOString();
			req.session.timestamp = timestamp; */
			res.status(200).json({ token: token })
			
		} catch (e) {
			console.log('HERE', e)
			res.status(404).json({ message: 'Invalid Login details' })
		}
		
	} else {
		res.status(400).send('Please enter Username and Password!');
		res.end();
	}
});

export default login;