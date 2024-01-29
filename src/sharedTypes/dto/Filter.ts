type TextFilter = {
  type: "contains" | "equals" | "startsWith",
  filterType: "text"
  filter: string
}

export type FilterModel = TextFilter

export type Filter<T> = Partial<Record<keyof T, FilterModel>>