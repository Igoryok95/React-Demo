export const GROUPED_COLUMNS = [
  {
    Header: "Место",
    sticky: "left",
    columns: [
	  {
        Header: "Geo ID",
        accessor: "geoId",
        disableFilters: true,
        sticky: "left",
      },
	  {
        Header: "Страна",
        accessor: "countriesAndTerritories",
		disableFilters: true,
      },
    ],
  },
  {
    Header: "Информация",
    columns: [
      {
        Header: "Дата",
        accessor: "dateRep",
		disableFilters: true,
      },
      {
        Header: "Население",
        accessor: "popData2019",
		disableFilters: true,
      },
	  {
        Header: "Кол-во случаев",
        accessor: "cases",
		disableFilters: true,
      },
      {
        Header: "Кол-во смертей",
        accessor: "deaths",
		disableFilters: true,
      },
      {
        Header: "Случаев на 1000",
        Cell: ({ row }) => Math.round((`${row.original.cases / row.original.popData2019 * 1000}`) * 1000) / 1000,
		disableFilters: true,
      },
      {
        Header: "Смертей на 1000",
        Cell: ({ row }) => Math.round((`${row.original.deaths / row.original.popData2019 * 1000}`) * 1000) / 1000,
		disableFilters: true,
      },
    ],
  },
];
