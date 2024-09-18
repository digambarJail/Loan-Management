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
  loanId: string;
  loanStatus : string;
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
      loanStatus:"Pending"
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


const updateLoanStatus = async (req: Request<{}, {}, LoanApplicationBody>, res: Response): Promise<void> => {
  try {
    const { loanId, loanStatus } = req.body;

    // Find the loan by ID
    const loan = await LoanApplicationModel.findById(loanId);
    console.log(loanStatus,loan?.loanStatus)
    // Check if the loan exists
    if (!loan) {
      console.log('not present')
      res.status(404).json({ error: 'Loan application not found' });
      return; // Ensure the function exits after sending the response
    }

    console.log('l',loan)
    loan.loanStatus = loanStatus;


    // Save the changes
    await loan.save();
    
    console.log('loan',loan)
    // Respond with success
    res.status(200).json({ message: 'Loan status updated successfully', loan });
  } catch (error) {
    console.error('Error updating loan status', error);
    res.status(500).json({ error: 'An error occurred while updating the loan status' });
  }
};



export { loanApplication,getLoans,updateLoanStatus };
