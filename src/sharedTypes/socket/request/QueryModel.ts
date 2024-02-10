import {Filter} from "../../dto/Filter";
import {Page} from "../../dto/Page";

export type QueryModel<TFilter> = {
  filter: Filter<TFilter>
  page: Page
}