import {QueryModel} from "../sharedTypes/socket/request/QueryModel";
import {BaseRequest} from "../sharedTypes/socket/request/Request";

export const isLegalFilter = <TRequestFilter, TLegalFilters extends readonly string[]>(
  request: BaseRequest<QueryModel<TRequestFilter>>,
  legalFilterList: TLegalFilters,
) => {
  const filterColumns = Object.keys(request.payload.filter);
  for (const filterColumn of filterColumns) {
    if(!legalFilterList.includes(filterColumn)){
      return false
    }
  }

  return true
}