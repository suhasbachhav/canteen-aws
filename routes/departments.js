
/**
 * @swagger
 * tags:
 *   name: departments
 *   description: The departments managing API
 * /departments:
 *   get:
 *     summary: Lists all the departments
 *     tags: [departments]
 *     responses:
 *       200:
 *         description: The list of the departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id: integer
 *                    dept_name: string   
 *   post:
 *     summary: Create a new departments
 *     tags: [departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 deptName:
 *                    type: string
 *              required:
 *                 -deptName
 *     responses:
 *       200:
 *         description: The created departments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       500:
 *         description: Some server error
 *       400:
 *         description: Error for departments creation
 * /departments/{name}/{id}:
 *   put:
 *    summary: Update the departments by the id
 *    tags: [departments]
 *    parameters:
 *      - in: path
 *        name: name
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The departments id
 *    responses:
 *      200:
 *        description: The departments was updated
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 affectedRows: integer
 *      400:
 *        description: Error for departments updation
 */
import express from 'express';
import returnResultSet from '../utils/db.js';
import authenticate from '../utils/authenticate.js';

const departments = express.Router();
departments.use(authenticate);

departments.get('/', async (req, res) => {
	try{
		res.json(await returnResultSet('SELECT * FROM `departments` ORDER BY dept_name ASC'));
	} catch (e){
		res.status(404).json({message: 'Departments not found'})
	}
});

departments.post('/',async(req,res) => {
	try{
		const resultSet  = await returnResultSet( "INSERT INTO `departments` (`dept_name`) VALUES (?)", [req.body.deptName]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined
		});
	} catch (e){
		res.status(400).json({message: 'Error for Department creation'})
	}
});
departments.put('/:name/:id',async(req,res) =>{
	try{
		const resultSet  = await returnResultSet("UPDATE `departments` SET `dept_name` = ? WHERE `departments`.`id` = ?", [req.params.name, req.params.id ]);
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined
		});
	} catch (e){
		res.status(400).json({message: 'Error for Department updation'})
	}
});


export default departments;