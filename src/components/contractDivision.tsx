import React, { useEffect, useState } from "react";
import { ContractRegionService } from "../services/contractRegion.service";
import { IContractRegionModel } from "../models/contractregionModel";
import { Typography, TextField, Button } from "@mui/material";

export default function ContractDivision() {
  const [contractRegions, setContractRegions] = useState<
    IContractRegionModel[]
  >([]);
  const [contractId, setContractId] = useState<string>("");
  const handleContractIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContractId(event.target.value);
    getContractRegionByContractId(Number(event.target.value));
  };

  const getContractRegionByContractId = (
    contractId: number,
    fetchOnEditDetail = false
  ) => {
    ContractRegionService.getContractRegionByContractId(contractId)
      .then((res: IContractRegionModel[]) => {
        setContractRegions(res);
        console.log("Success fetching contract region based on Id.", res);
      })
      .catch((error) => {
        console.log("Error fetching contract region based on Id.");
      })
      .finally(() => {
        console.log("Finally block of contract region based on Id.");
      });
  };

  return (
    <>
      <h1 style={{ color: "red" }}>Welcome to home page</h1>
      <Typography color="blue" fontSize={18}>
        Contract Region By contractId: {contractId}
      </Typography>{" "}
      <br />
      <Typography color="blue" fontSize={18}>
        Enter contractId below:
      </Typography>{" "}
      <br />
      <TextField
        label="ContractId"
        name="contractId"
        value={contractId}
        onChange={handleContractIdChange}
      />
      <br />
      <br />
      <table className="master-table">
        <thead className="master-table-header-row">
          <tr>
            <th align="left">RegionId</th>
            <th align="left">Name</th>
            <th align="left">DivisionId</th>
          </tr>
        </thead>
        <tbody>
          {contractRegions.length <= 0 && (
            <tr>
              <td colSpan={3}>No Records Found!</td>
            </tr>
          )}
          {contractRegions != null &&
            contractRegions.map((cr) => (
              <tr className="master-table-data-row" key={cr.regionId}>
                <td align="left">{cr.regionId}</td>
                <td align="left">{cr.regionName}</td>
                <td align="left">{cr.divisionId}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Button variant="contained" color="error">
        Delete
      </Button>
    </>
  );
}
