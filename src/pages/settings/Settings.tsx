import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

export const Settings = () => {
  const tagsColumns: GridColDef[] = useMemo(() => {
    return [
      { field: "value", headerName: "Value", width: 150 },
      { field: "label", headerName: "Label", width: 150 },
    ];
  }, []);
  const [tagRows, setTagRows] = useState([]);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch("http://localhost:8080/tags/");
      // convert the data to json
      const json = await data.json();

      // set state with the result
      setTagRows(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  return (
    <div>
      <DataGrid columns={tagsColumns} rows={tagRows} />
    </div>
  );
};
