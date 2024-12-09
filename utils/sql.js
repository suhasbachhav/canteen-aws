import mysql from 'mysql';  


const connection = mysql.createConnection({
    host: "canteenbkprivate.cxec2kaymwkd.ap-south-1.rds.amazonaws.com",  
    user: "admin",  
    password: "*************",  
    database: "canteenbkprivate",
    timezone: 'ist'  
});
connection.connect();


export default connection;
