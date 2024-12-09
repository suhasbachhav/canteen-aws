/**
 * @swagger
 * tags:
 *   name: vendor
 *   description: The vendor managing API
 * /vendor:
 *   get:
 *     summary: Lists all the vendor
 *     tags: [vendor]
 *     responses:
 *       200:
 *         description: The list of the vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id: integer
 *                    vendor: string   
 *   post:
 *     summary: Create a new vendor
 *     tags: [vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 name:
 *                    type: string
 *                 userName:
 *                    type: string
 *                 pass:
 *                    type: string
 *                 email:
 *                    type: string
 *                 type:
 *                    type: integer
 *                 status:
 *                    type: integer
 *              required:
 *                 -name
 *                 -userName
 *                 -email
 *                 -pass
 *                 -type
 *                 -status
 *     responses:
 *       200:
 *         description: The created vendor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       500:
 *         description: Some server error
 *       400:
 *         description: Error for vendor creation
 * /vendor/{id}:
 *   get:
 *     summary: Get the vendor by id
 *     tags: [vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vendor id
 *     responses:
 *       200:
 *         description: The vendor response by id
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id: integer
 *                    vendor: string 
 *                    password: string 
 *                    username: string 
 *                    foodservice: string 
 *                    status: integer 
 *                    email: string 
 *       404:
 *         description: The vendor was not found
 *   put:
 *    summary: Update the vendor by the id
 *    tags: [vendor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The vendor id
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 name:
 *                    type: string
 *                 userName:
 *                    type: string
 *                 pass:
 *                    type: string
 *                 email:
 *                    type: string
 *                 type:
 *                    type: integer
 *                 status:
 *                    type: integer
 *              required:
 *                 -name
 *                 -userName
 *                 -email
 *                 -pass
 *                 -type
 *                 -status
 *    responses:
 *      200:
 *        description: The vendor was updated
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 affectedRows: integer
 *      400:
 *        description: Error for vendor updation
 */


import express from 'express';
import returnResultSet from '../utils/db.js';
import md5 from 'md5';
import authenticate from '../utils/authenticate.js';

const vendor = express.Router();
vendor.use(authenticate);

vendor.get('/', async (req, res) => {
	try {
		res.json(await returnResultSet("SELECT id, vendor FROM `users` WHERE foodservice != 0"));
	} catch (e) {
		res.status(400).json({ message: 'users not found' })
	}
});

vendor.get('/:id', async (req, res) => {
	try {
		res.json(await returnResultSet("SELECT * FROM users WHERE id =?", [req.params.id]));
	} catch (e) {
		res.status(400).json({ message: 'vendor not found' })
	}
});

vendor.get('/vendorwise', async (req, res) => {
	try {
		let userSql = req.session.foodservice ? "SELECT id , vendor FROM `users` WHERE id = " + req.session.Uid :
			"SELECT id , vendor FROM `users` WHERE foodservice != 0";
		res.json(await returnResultSet(userSql));
	} catch (e) {
		res.status(404).json({ message: 'users not found' })
	}
});

vendor.put('/:id', async (req, res) => {
	const body = req.body;
	const password = md5(body.pass);
	try {
		const resultSet = await returnResultSet("UPDATE `users` SET `vendor` = ? , `username` = ?,  `password` = ? ,  `email` = ?  ,  `foodservice` = ?,  `status` = ? WHERE `users`.`id` = ?",
			[body.name, body.userName, password, body.email, body.type, body.status, req.params.id]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined,
		});
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'Error for vendor updatation' })
	}
});

vendor.post('/', async (req, res) => {
	const body = req.body;
	const password = md5(body.pass);
	try {
		const resultSet = await returnResultSet("INSERT INTO `users` (`vendor`, `username`, `password`, `foodservice`, `status`, `email`) VALUES (?, ?, ?, ?, ?, ?)", [body.name, body.userName, password, body.type, body.status, body.email]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined,
		});
	} catch (e) {
		res.status(400).json({ message: 'Error for vendor updation' })
	}
});



export default vendor;