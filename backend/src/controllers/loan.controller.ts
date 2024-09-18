import { Request, Response } from 'express';
import LoanApplicationModel from '../models/LoanApplication.model';
import sendMail from './email.controller';

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
    // Check if the loan exists
    if (!loan) {
      console.log('not present')
      res.status(404).json({ error: 'Loan application not found' });
      return; // Ensure the function exits after sending the response
    }

    loan.loanStatus = loanStatus;


    // Save the changes
    await loan.save();
    
    let subject: string;
    let message: string;
    let html: string;

    switch (loanStatus) {
      case 'approved':
        subject = 'Loan Application Approved';
        message = 'Congratulations! Your loan application has been approved.';
        html = `
          <html>
            <body>
              <h1>Loan Approved</h1>
              <p>Congratulations! Your loan application has been approved.</p>
            </body>
          </html>
        `;
        break;
      case 'rejected':
        subject = 'Loan Application Rejected';
        message = 'We regret to inform you that your loan application has been rejected.';
        html = `
          <html>
            <body>
              <h1>Loan Rejected</h1>
              <p>We regret to inform you that your loan application has been rejected.</p>
            </body>
          </html>
        `;
        break;
      case 'pending':
        subject = 'Loan Application Pending';
        message = 'Your loan application is still under review. We will update you once there is a decision.';
        html = `
          <html>
            <body>
              <h1>Loan Pending</h1>
              <p>Your loan application is still under review. We will update you once there is a decision.</p>
            </body>
          </html>
        `;
        break;
      default:
        subject = 'Loan Status Updated';
        message = `Your loan application status has been updated to ${loanStatus}.`;
        html = `
          <html>
            <body>
              <h1>Loan Status Updated</h1>
              <p>Your loan application status has been updated to ${loanStatus}.</p>
            </body>
          </html>
        `;
        break;
    }

    const to = 'ddjail2004@gmail.com'; // Replace with the actual recipient's email

    await sendMail({ subject, text: message, html, to });
    // Respond with success
    res.status(200).json({ message: 'Loan status updated successfully', loan });
  } catch (error) {
    console.error('Error updating loan status', error);
    res.status(500).json({ error: 'An error occurred while updating the loan status' });
  }
};



export { loanApplication,getLoans,updateLoanStatus };
