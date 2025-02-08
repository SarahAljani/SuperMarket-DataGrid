import Papa from "papaparse";
import { useEffect, useState } from "react";
import { DataTable, useDataTableColumns } from "mantine-datatable";
import { sortBy } from "lodash";
import dayjs from "dayjs";
import { Button, Group, Input, TextInput } from "@mantine/core";

const DataGridDisplay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allSearchableColumns = [
    "Invoice ID",
    "Branch",
    "City",
    "Customer type",
    "Gender",
    "Product line",
    "Unit price",
    "Quantity",
    "Tax 5%",
    "Total",
    "Date",
    "Time",
    "Payment",
    "cogs",
    "gross margin percentage",
    "gross income",
    "Rating",
  ];
  const [selectedColumns, setSelectedColumns] = useState(allSearchableColumns);

  // Toggle checkbox selection
  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const PAGE_SIZE = 7;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "Invoice ID",
    direction: "asc",
  });
  const [records, setRecords] = useState([]);

  const key = "resize-complex-example";
  const { effectiveColumns, resetColumnsOrder } = useDataTableColumns({
    key,
    columns: allSearchableColumns.map((col) => ({
      accessor: col,
      title: col,
      sortable: true,
      draggable: true,
      resizable: true,
    })),
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  // Filter function based on selected columns
  useEffect(() => {
    let filteredData = data;

    if (searchQuery.trim() !== "") {
      filteredData = data.filter((row) =>
        selectedColumns.some(
          (col) =>
            row[col] &&
            row[col]
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }

    const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
    if (sortStatus.direction === "desc") {
      sortedData.reverse();
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(sortedData.slice(from, to));
  }, [data, searchQuery, selectedColumns, page, sortStatus]);

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-input"
        />
        <Button onClick={() => document.getElementById("file-input").click()}>
          Choose a CSV file
        </Button>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          {allSearchableColumns.map((column) => (
            <label key={column} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={() => handleCheckboxChange(column)}
              />
              {column}
            </label>
          ))}
        </div>
        {/* Search input */}
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DataTable
        style={{ borderRadius: "10px", boxShadow: "0px 1px 3px 3px #0000002b" }}
        withTableBorder
        minHeight={300}
        withColumnBorders
        striped
        records={records}
        storeColumnsKey={key}
        columns={effectiveColumns}
        totalRecords={data.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        noRecordsText="No records to show"
      />
      <Group justify="right" style={{ paddingTop: "20px" }}>
        <Button onClick={resetColumnsOrder}>Reset Column Order</Button>
      </Group>
    </div>
  );
};

export default DataGridDisplay;
