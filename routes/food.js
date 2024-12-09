
/**
 * @swagger
 * tags:
 *   name: food
 *   description: The food managing API
 * /food:
 *   get:
 *     summary: Lists all the food
 *     tags: [food]
 *     responses:
 *       200:
 *         description: The list of the food
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id: integer
 *                    foodType: string  
 *   post:
 *     summary: Create a new entry for food
 *     tags: [food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 foodType:
 *                    type: integer
 *                    minimum: 1
 *                    maximum: 3
 *                 empfoodId:
 *                    type: integer
 *                 vendorId:
 *                    type: integer
 *              required:
 *                 -foodType
 *                 -empfoodId
 *                 -vendorId
 *     responses:
 *       200:
 *         description: The created entry for food.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   affectedRows: integer
 *       500:
 *         description: Some server error
 *       400:
 *         description: Error on food Entry
 
 */
import express from 'express';
import returnResultSet from '../utils/db.js';
import authenticate from '../utils/authenticate.js';

const food = express.Router();
food.use(authenticate);

food.get('/', async (req, res) => {
	try{
		res.json(await returnResultSet("SELECT * FROM `foodtype`"));
	} catch (e){
		res.status(404).json({message: 'food not found'})
	}
});

food.post('/',async(req,res) =>{
	const foodType = req.body.foodType;
	const empFoodId = req.body.empFoodId;
	const vendorId = req.body.vendorId;
	let food = "Special Food";
	if(foodType == 1){
		food = "Food";
	}else if(foodType == 2){
		food = "Pizza";
	}

	const today = new Date();
	const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const currentChecktime = "01/01/2011 "+currentTime;
	let currDateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' 02:00:00';
	if (Date.parse('01/01/2011 02:00:00') >= Date.parse(currentChecktime)){
		currDateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1)+' 17:00:00';
	}

	try{
		const qry1Res =  await returnResultSet('SELECT * FROM `emp_data` WHERE emp_id =? AND status = 1', [empFoodId]);
		if(qry1Res.length){
			let sqlCheckDuplcte = "SELECT * FROM `dailyfood` WHERE empId =? AND FoodType !=3 AND date_time >=?";
			if(foodType == 3){
				sqlCheckDuplcte = "SELECT * FROM `dailyfood` WHERE empId =? AND FoodType =3 AND date_time >=?";
			}
			const qry2Res =  await returnResultSet(sqlCheckDuplcte , [empFoodId , currDateTime]);
			if((qry2Res.length == 2 && qry1Res[0].doubleFood == 1) || (qry2Res.length > 0 && qry1Res[0].doubleFood == 0)) {
				res.json("Allready Food Serve");
			}else{
				const sqlQuery = 'INSERT INTO `dailyfood` (empId, FoodType , token , updatedby) VALUES (?, ?, 0, ?)';
				const qry3Res =  await returnResultSet(sqlQuery, [empFoodId , foodType , vendorId]);
				if(qry3Res.affectedRows == 1){
					res.json({username:qry1Res[0].user_name, foodType:food});
				} else res.status(400).send("Error on food Entry");
			}
		} else res.status(404).send("Invalid User");
	
	} catch (e){
		res.status(400).json({message: 'Error on food Entry'})
	}
});



export default food;