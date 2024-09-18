import mongoose, { Document, Schema } from 'mongoose';

interface ILoanApplication extends Document {
  name: string;
  loanAmount: number;
  loanReason: string;
  employmentStatus: string;
  employerAddress: string;
  consent: boolean;
  loanStatus : string;
}

const LoanApplicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanReason: { type: String, required: true },
  employmentStatus: { type: String, required: true },
  employerAddress: { type: String, required: true },
  loanStatus: { type: String, default:"Pending" }
},{timestamps:true});

const LoanApplicationModel = mongoose.model<ILoanApplication>('LoanApplication', LoanApplicationSchema);

export default LoanApplicationModel;



