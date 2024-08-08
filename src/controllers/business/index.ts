import { Request, Response } from "express";
import { BusinessModel } from "../../models/business";
import { CreateBusinessDto } from "./dto";
import { Business, WorkflowStatus } from "../../types/businessTypes";

const businesses: Business[] = [];

export class BusinessController {
  static fienIdExists(fien: string) {
    return businesses.find((v: Business) => v.fein === fien);
  }
  static createBusiness(req: Request, res: Response): any {
    const { fein, name, ...rest } = req.body as CreateBusinessDto;
    if (BusinessController.fienIdExists(fein))
      return res.status(400).json({
        message: "Fien ID already registered",
      });
    const newBusiness = new BusinessModel(
      fein,
      name,
      rest?.industry,
      rest?.contact
    );
    businesses.push(newBusiness);
    res.status(201).json({
      business: newBusiness,
      nextStep:
        "Provide industry to progress to Market Approved or Market Declined.",
    });
  }

  static progressBusiness(req: Request, res: Response): void {
    const { fein } = req.params;
    const business = businesses.find((b) => b.fein === fein);

    if (!business) {
      res.status(404).json({ message: "Business not found" });
      return;
    }

    let nextStep = "";

    switch (business.status) {
      case WorkflowStatus.New:
        if (
          business.industry &&
          BusinessModel.validateIndustry(business.industry)
        ) {
          business.status = WorkflowStatus.MarketApproved;
          nextStep =
            "Provide valid contact information to progress to Sales Approved.";
        } else {
          business.status = WorkflowStatus.MarketDeclined;
          nextStep = "No further steps. The business has been declined.";
        }
        break;
      case WorkflowStatus.MarketApproved:
        if (
          business.contact &&
          BusinessModel.validateContact(business.contact)
        ) {
          business.status = WorkflowStatus.SalesApproved;
          nextStep =
            "Mark the business as Won or Lost to finalize the workflow.";
        } else {
          res.status(400).json({
            message: "Valid contact information is required to progress.",
          });
          return;
        }
        break;
      case WorkflowStatus.SalesApproved:
        if (req.body.status === WorkflowStatus.Won) {
          business.status = WorkflowStatus.Won;
          nextStep = "The business deal is won. No further steps.";
        } else if (req.body.status === WorkflowStatus.Lost) {
          business.status = WorkflowStatus.Lost;
          nextStep = "The business deal is lost. No further steps.";
        } else {
          res.status(400).json({
            message: 'Invalid status. Provide either "Won" or "Lost".',
          });
          return;
        }
        break;
      default:
        res
          .status(400)
          .json({
            message: `Cannot progress from the current status. Deal already marked ${business.status}`,
          });
        return;
    }

    res.status(200).json({
      business,
      nextStep,
    });
  }
}
