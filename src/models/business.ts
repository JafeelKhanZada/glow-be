import { Industry, Contact, WorkflowStatus } from "../types/businessTypes";

export class BusinessModel {
  fein: string;
  name: string;
  industry?: Industry;
  contact?: Contact;
  status: WorkflowStatus;

  constructor(
    fein: string,
    name: string,
    industry?: Industry,
    contact?: Contact
  ) {
    this.fein = fein;
    this.name = name;
    this.industry = industry;
    this.contact = contact;
    this.status = WorkflowStatus.New;
  }

  static validateIndustry(industry: string): boolean {
    const validIndustries: Industry[] = [
      "restaurants",
      "stores",
      "wholesale",
      "services",
    ];
    return validIndustries.includes(industry as Industry);
  }

  static validateContact(contact: Contact): boolean {
    return !!contact && !!contact.name && !!contact.phone;
  }
}
