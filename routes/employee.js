
/**
 * @swagger
 * tags:
 *   name: employee
 *   description: The employee managing API
 * /employee:
 *   get:
 *     summary: Lists all the employee
 *     tags: [employee]
 *     responses:
 *       200:
 *         description: The list of the employee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    ISOdata: integer
 *                    empId: integer  
 *                    department: integer   
 *   post:
 *     summary: Create a new entry for employee
 *     tags: [employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 empId:
 *                    type: integer
 *                 empStatus:
 *                    type: integer
 *                 empFoodAllow:
 *                    type: integer
 *                 empComp:
 *                    type: integer
 *                 empDept:
 *                    type: integer
 *                 empISOdataID:
 *                    type: string
 *                 empBase64Img:
 *                    type: string
 *                 empName:
 *                    type: string
 *              required:
 *                 -empId
 *                 -empStatus
 *                 -empFoodAllow
 *                 -empComp
 *                 -empDept
 *                 -empISOdataID
 *                 -empBase64Img
 *                 -empName
 *     responses:
 *       200:
 *         description: The created entry for employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       500:
 *         description: Some server error
 *       400:
 *         description: Error on employee Entry
 * /employee/in-active/{empIdArr}:
 *   put:
 *    summary: Update the employee by the id
 *    tags: [employee]
 *    parameters:
 *      - in: path
 *        name: empIdArr
 *        schema:
 *          type: string
 *        required: true
 *        description: The employee id array deactivate
 *    responses:
 *      200:
 *        description: The employee deactivated
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 affectedRows: integer
 *      404:
 *        description: employee not found
 * /employee/{id}:
 *   get:
 *     summary: Get the employee by id
 *     tags: [employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee response by id
 *         contens:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id: integer
 *                    employee: string 
 *                    password: string 
 *                    username: string 
 *                    foodservice: string 
 *                    status: integer 
 *                    email: string 
 *       404:
 *         description: The employee was not found
 */

import express from 'express';
import returnResultSet from '../utils/db.js';
import authenticate from '../utils/authenticate.js';

const employee = express.Router();
employee.use(authenticate);

employee.get('/', async (req, res) => {
	try{
		res.json(await returnResultSet('SELECT emp_id, ISOdata, department FROM `emp_data` WHERE status =1 ORDER BY department'));
	} catch (e){
		res.status(404).json({message: 'employee not found'})
	}
});
employee.get('/:id', async (req, res) => {
	try{
		res.json(await returnResultSet('SELECT ISOdata, department, doubleFood, emp_Comp, emp_id, status,user_name, base64Img FROM emp_data WHERE emp_id = ?', [req.params.id]));
	} catch (e){
		res.status(404).json({message: 'employee not found'})
	}
});

employee.post('/',async(req,res) => {
	const empId = req.body.empId;
   	const empStatus = req.body.empStatus;
   	const empFoodAllow = req.body.empFoodAllow;
   	const empISOdataID = req.body.empISOdataID;
   	const empBase64Img = req.body.empBase64Img;
   	const empName = req.body.empName;
   	const empDept = req.body.empDept;
   	const empComp = req.body.empComp;

	try{
		const resultSet  = await returnResultSet("SELECT * FROM `emp_data` WHERE emp_id = ?", [empId]);
		const sqlQuery = resultSet.length ? 'UPDATE `emp_data` SET `status` = ? , `doubleFood` = ? ,  `ISOdata` = ? ,  `base64Img` = ? ,  `user_name` = ? ,  `department` = ? , `emp_Comp` = ?  WHERE `emp_data`.`emp_id` = ?' : 
		'INSERT INTO emp_data (status , doubleFood , ISOdata , base64Img , user_name , department , emp_Comp , emp_id) VALUES( ? , ?, ? , ? , ? , ? , ? , ?)';
		const resultSet2  = await returnResultSet(sqlQuery, [empStatus , empFoodAllow , empISOdataID , empBase64Img , empName , empDept , empComp , empId]);
		res.json({
			existing: resultSet.affectedRows ?? undefined,
			affectedRows: resultSet2.affectedRows ?? undefined
		});
	} catch (e){
		res.status(400).json({message: 'Error for employee registration'})
	}
});

employee.put('/in-active/:idArr', async (req, res) => {
	const deactivateEmpIdArr = req.params.idArr;
	const empArr = deactivateEmpIdArr.split(",");
	Object.keys(empArr).map(k => empArr[k] = empArr[k].trim());
	const empArr1 = empArr.filter(function(entry) { return entry.trim() != ''; });
	const textArray = empArr1.join("','");

	try{
		const resultSet  = await returnResultSet("UPDATE emp_data SET status = '0' WHERE emp_id IN ('"+textArray+"')");
		res.json({
			affectedRows: resultSet.affectedRows ?? undefined
		});
	} catch (e){
		res.status(404).json({message: 'employee not found'})
	}
});


export default employee;