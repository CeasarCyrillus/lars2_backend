import {QueryRequest} from "./QueryRequest";
import {ReportFilter} from "../../dto/ReportFilter";
import {BaseRequest} from "./Request";

export type ReportsRequest = BaseRequest<QueryRequest<ReportFilter>>