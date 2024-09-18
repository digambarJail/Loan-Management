import { Request, Response } from 'express';
import LoanApplicationModel from '../models/LoanApplication.model';

// Define the expected structure of the form data
interface LoanApplicationBody {
  name: string;
  loanAmount: number;
  loanReason: string;
  employmentStatus: string;
  employerAddress: string;
  consent: boolean;
}

const loanApplication = async (req: Request<{}, {}, LoanApplicationBody>, res: Response): Promise<void> => {
  try {
    // Destructure the data coming from the request body
    const { name, loanAmount, loanReason, employmentStatus, employerAddress } = req.body;

    // Create a new loan application based on the form input
    const result = await LoanApplicationModel.create({
      name,
      loanAmount,
      loanReason,
      employmentStatus,
      employerAddress,
    });

    // Send success response
    res.status(201).json({ message: 'Loan application submitted successfully', data: result });
  } catch (error) {
    console.error('Error applying for loan', error);
    res.status(500).json({ error: 'An error occurred while processing the loan application' });
  }
};

const getLoans = async (req: Request<{}, {}, LoanApplicationBody>, res: Response): Promise<void> => {
  try {
    
    const loans = await LoanApplicationModel.find({});

    res.status(201).json({ message: 'Loan application submitted successfully', loans });
  } catch (error) {
    console.error('Error fetching loans', error);
    res.status(500).json({ error: 'An error occurred while fetching loans' });
  }
};


export { loanApplication,getLoans };
