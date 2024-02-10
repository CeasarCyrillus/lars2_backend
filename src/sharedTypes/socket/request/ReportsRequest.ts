import {QueryModel} from "./QueryModel";
import {ReportFilter} from "../../dto/filter/ReportFilter";
import {BaseRequest} from "./Request";

export type ReportsRequest = BaseRequest<QueryModel<ReportFilter>>