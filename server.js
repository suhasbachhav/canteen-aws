import serverless from 'serverless-http';
import express from 'express';  
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import login from './routes/login.js';
import departments from './routes/departments.js';
import company from './routes/company.js';
import vendor from './routes/vendor.js';
import reports from './routes/reports.js';
import employee from './routes/employee.js';
import sessionData from './routes/sessionData.js';
import food from './routes/food.js';
import pizza from './routes/pizza.js';
import tokenData from './routes/tokenData.js';
import vendorReport from './routes/vendorReport.js';
import todaysRecords from './routes/todaysRecord.js';
import cors from 'cors';
const app = express();

app.use(cors({origin: '*'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/login', login);

app.use('/departments', departments);
app.use('/company', company); // 1
app.use('/vendor', vendor);
app.use('/reports', reports);
app.use('/todaysRecords', todaysRecords);
app.use('/vendorReport', vendorReport);
app.use('/employee', employee);
app.use('/session', sessionData);
app.use('/food', food);
app.use('/pizza', pizza);
app.use('/tokenData', tokenData);


let urlData = '';
app.use(function(req, res, next) {
  urlData = req.protocol + "://" + req.get('host') + req.originalUrl;
  return next();
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Canteen-CRUD-MicroServices",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "Suhas",
        url: "https://linkedin.com/in/suhas-bachhav",
      },
      contact: {
        name: "Suhas Bachhav",
        url: "https://linkedin.com/in/suhas-bachhav",
        email: "ksb.suhas@gmail.com",
      },
    },
    servers: [
      {
        url: urlData,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);

const lambda = serverless(app)

export async function handler(event, context) {
  return lambda(event, context)
}
