import {ReportStatus} from "./ReportStatus";


export type Report = {
  status: ReportStatus
  period: Date
  teamName: string
  reporter: {
    name: string
    email: string
    phone: string
  }
  created: Date
  revision: string
}