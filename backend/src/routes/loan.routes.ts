import { Router } from "express";
import { getLoans, loanApplication } from "../controllers/loan.controller";

const loanRouter = Router();

loanRouter.route('/apply').post(loanApplication)
loanRouter.route('/getLoans').get(getLoans)


export default loanRouter;