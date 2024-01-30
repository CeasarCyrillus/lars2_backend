export type TextFilter = {
  filterType: "text"
  type: "contains" | "equals" | "startsWith",
  filter: string
}

export type SetFilter = {
  filterType: "set"
  values: string[]
}

export const isTextFilter = (candidate: FilterModel): candidate is TextFilter => candidate.filterType === "text"
export const isSetFilter = (candidate: FilterModel): candidate is SetFilter => candidate.filterType === "set"
export type FilterModel = TextFilter | SetFilter

export type Filter<T> = Partial<Record<keyof T, FilterModel>>