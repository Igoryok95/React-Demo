import React, { useMemo, } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useColumnOrder,
} from "react-table";
import MockData from "./covid.json";
import { GROUPED_COLUMNS } from "./columns";
import "./BasicTable.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { Checkbox } from "./Checkbox";

export default function SortngTable() {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MockData.records, []);
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  );
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    pageOptions,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    getToggleHideAllColumnsProps,
    allColumns,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  
  return (
    <React.Fragment>
      <div style={{ textAlign: "left" }}>
        <Checkbox {...getToggleHideAllColumnsProps()} />Спрятать/Показать все
        {allColumns.map((column) => (
          <div>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />
              {column.Header}
            </label>
          </div>
        ))}
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
		</tbody>
      </table>
      <div>
        <span>
          Страница {pageIndex + 1} из {pageOptions.length}{" "}
        </span>
        <span>
          | Перейти на
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNum = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNum);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {" "}
              Показать {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </React.Fragment>
  );
}
