import {Filter} from "../../dto/Filter";
import {Page} from "../../dto/Page";

export type QueryRequest<TFilter> = {
  filter: Filter<TFilter>
  page: Page
}