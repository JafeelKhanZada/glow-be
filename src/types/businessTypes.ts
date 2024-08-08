export type Industry = "restaurants" | "stores" | "wholesale" | "services";

export interface Contact {
  name: string;
  phone: string;
}

export interface Business {
  fein: string;
  name: string;
  industry?: Industry;
  contact?: Contact;
  status: string;
}

export enum WorkflowStatus {
  New = "New",
  MarketApproved = "Market Approved",
  MarketDeclined = "Market Declined",
  SalesApproved = "Sales Approved",
  Won = "Won",
  Lost = "Lost",
}
