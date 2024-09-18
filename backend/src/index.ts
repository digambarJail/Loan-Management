import express, { Express } from 'express';
import path from 'path';
import cors from 'cors'; // Import cors
import connectDB from './db/connectDB'; // Assuming your file is `dbConnection.ts`
import loanRouter from './routes/loan.routes';

// Establish database connection
connectDB();

const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration to allow requests from port 5173
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from Vite dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Enable cookies and credentials if needed
}));

// Define routes
app.use('/api', loanRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});
