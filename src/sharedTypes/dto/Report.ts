import {ReportStatus} from "./ReportStatus";
import {Contact} from "./Contact";


export type Report = {
  status: ReportStatus
  period: Date
  teamName: string
  reporter: Contact
  created: Date
  revision: string
}