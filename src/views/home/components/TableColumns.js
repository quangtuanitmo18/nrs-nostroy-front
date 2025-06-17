import { FILTER_TYPE_DATE, FILTER_TYPE_EQ, SPECIALIST_STATUS_MAP } from '@/constants/filter'

export const columns = [
  {
    heading: 'Идентификационный номер',
    value: 'registrationNumber',
    sortOptions: {
      sortable: true,
      sortByValue: 'registrationNumber',
    },
    filterOptions: {
      // filterByValue: 'registrationNumber',
      // filterType: FILTER_TYPE_LIKE,
    },
  },
  {
    heading: 'ФИО',
    value: 'fio',
    sortOptions: {
      sortable: true,
      sortByValue: 'fio',
    },
    filterOptions: {
      // filterByValue: 'fio',
      // filterType: FILTER_TYPE_LIKE,
    },
  },
  {
    heading: 'Дата принятия решения о включении сведений в реестр',
    value: 'inclusionProtocolDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'inclusionProtocolDate',
    },
    filterOptions: {
      filterByValue: 'inclusionProtocolDate',
      filterType: FILTER_TYPE_DATE,
    },
  },
  {
    heading: 'Дата внесения изменений',
    value: 'updated',
    sortOptions: {
      sortable: true,
      sortByValue: 'updated',
    },
    filterOptions: {
      filterByValue: 'updated',
      filterType: FILTER_TYPE_DATE,
    },
  },
  {
    heading: 'Дата выдачи свидетельства о независимой оценке квалификации',
    value: 'inclusionCertificateDate',
    sortOptions: {
      sortable: true,
      sortByValue: 'inclusionCertificateDate',
    },
    filterOptions: {
      filterByValue: 'inclusionCertificateDate',
      filterType: FILTER_TYPE_DATE,
    },
  },
  {
    heading: 'Дата принятия решения об исключении сведений из реестра',
    value: 'suspensionProtocolDate',
    sortOptions: {
      // sortable: true,
      // sortByValue: 'suspensionProtocolDate',
    },
    filterOptions: {
      filterByValue: 'suspensionProtocolDate',
      filterType: FILTER_TYPE_DATE,
    },
  },
  {
    heading: 'Вид осуществляемых физическим лицом работ',
    value: 'workType',
    sortOptions: {
      sortable: true,
      sortByValue: 'workType',
    },
    filterOptions: {},
  },
  {
    heading: 'Статус',
    value: 'statusTitle',
    sortOptions: {
      sortable: true,
      sortByValue: 'suspensionProtocolDate',
    },
    filterOptions: {
      filterByValue: 'status',
      filterType: FILTER_TYPE_EQ,
      filterValues: SPECIALIST_STATUS_MAP,
    },
  },
]
