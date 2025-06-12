export const FILTER_TYPE_EQ = 1 // Type input is select
export const FILTER_TYPE_EQ_CHECK = 2 // Type input is select but a check mark is displayed in table
export const FILTER_TYPE_EQ_MULTI = 3 // Type input is multi select
export const FILTER_TYPE_EQ_MULTI_WITH_SEARCH = 4 // Type input is multi select with search
export const FILTER_TYPE_LIKE = 5 // Type input is text
export const FILTER_TYPE_DATE = 6 // Type input is date
export const FILTER_TYPE_ACTION = 7 // No input, only actions
export const FILTER_TYPE_EQ_WITH_SEARCH = 8 // Type input is select with search
export const FILTER_TYPE_BETWEEN = 9 // Type input is range slider
export const FILTER_TYPE_DATE_TIME = 10 // Type input is date&time
export const FILTER_TYPE_EDITABLE = 11 // Type input is editable
export const FILTER_TYPE_EQ_BY_GROUP = 12 // Type input is multi select by group
export const FILTER_TYPE_MONEY = 13 // Type input is money format "12 000"

export const SPECIALIST_WORK_TYPE = [
  {
    value: 'TEST',
    title:
      'Организация выполнения работ по строительству, реконструкции, капитальному ремонту, сносу объектов капитального строительства',
  },
]

export const SPECIALIST_STATUS_MAP = [
  {
    value: 'active',
    title: 'Действует',
  },
  {
    value: 'inactive',
    title: 'Исключен',
  },
]
