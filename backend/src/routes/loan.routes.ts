import { Router } from "express";
import { getLoans, loanApplication, updateLoanStatus } from "../controllers/loan.controller";

const loanRouter = Router();

loanRouter.route('/apply').post(loanApplication)
loanRouter.route('/getLoans').get(getLoans)
loanRouter.route('/updateLoanStatus').post(updateLoanStatus)

export default loanRouter;