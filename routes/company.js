
/**
 * @swagger
 * tags:
 *   name: company
 *   description: The company managing API
 * /company:
 *   get:
 *     summary: Lists all the company
 *     tags: [company]
 *     responses:
 *       200:
 *         description: The list of the company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    compID: integer
 *                    comp_name: string   
 *   post:
 *     summary: Create a new company
 *     tags: [company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 name:
 *                    type: string
 *              required:
 *                 -name
 *     responses:
 *       200:
 *         description: The created company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       500:
 *         description: Some server error
 *       400:
 *         description: Error for company creation
 * /company/{name}/{id}:
 *   put:
 *    summary: Update the company by the id
 *    tags: [company]
 *    parameters:
 *      - in: path
 *        name: name
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company id
 *    responses:
 *      200:
 *        description: The company was updated
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 affectedRows: integer
 *      400:
 *        description: Error for company updation
 */
import express from 'express';
import returnResultSet from '../utils/db.js';
import authenticate from '../utils/authenticate.js';

const company = express.Router();
company.use(authenticate);

company.get('/', async (req, res) => {
	try {
		res.json(await returnResultSet('SELECT compID, comp_name FROM `company` WHERE status =1 ORDER BY comp_name ASC'));
	} catch (e) {
		res.status(404).json({ message: 'company not found' })
	}
});

company.post('/', async (req, res) => {
	try {
		const resultSet = await returnResultSet("INSERT INTO `company` (`comp_name`, `address`, `status`) VALUES (?, ?, ?)", [req.body.name, 'Pune', 1]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined
		});
	} catch (e) {
		res.status(400).json({ message: 'Error for company creation' })
	}
});

company.put('/:name/:id', async (req, res) => {
	try {
		const resultSet = await returnResultSet("UPDATE `company` SET `comp_name` = ? WHERE `company`.`compID` = ?", [req.params.name, req.params.id]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined
		});
	} catch (e) {
		res.status(400).json({ message: 'Error for company updation' })
	}
});


export default company;