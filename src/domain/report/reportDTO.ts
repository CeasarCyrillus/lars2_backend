export type ReportStatus = "not-started" | "in-progress" | "approved" | "past-deadline"
export type ReportDTO = {
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