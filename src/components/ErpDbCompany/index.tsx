import React, { useState, useEffect, useMemo } from "react";
import { ErpDbCompanyService } from "../../services/erpDbCompany.service";
import {
  IErpDbCompanyDdlModel,
  IDepartmentErpDbCompanyDDL,
} from "../../models/ErpDbCompanyDdlModel";
import { Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { CustomAutoComplete } from "../CustomAutoComplete";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Shared } from "../../utility/shared";
import DepartmentErpDbCompany from "../../models/departmentErpDbCompanyModel";
import { IOption } from "../../utility/interfaces/select-option";
import { ProgrammeService } from "../../services/programme.service";
import { IProgrammeModel } from "../../models/programmeModel";
import { menuThreeDotsDefaultIcon } from "../../assets/images";

const Index = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (item: string) => {
    handleClose();
  };

  const [erpDbCompanyList, setErpDbCompanyList] = useState<
    IErpDbCompanyDdlModel[]
  >([]);
  const [departmentList, setDepartmentList] = useState<
    IDepartmentErpDbCompanyDDL[]
  >([]);
  const [programmeList, setProgrammeList] = useState<IProgrammeModel[]>([]);
  const validationSchema = Yup.object().shape({
    erpDbCompanyId: Yup.number()
      .nullable()
      .required("Please select ErpDbCompany"),
  });

  const methods = useForm<DepartmentErpDbCompany>({
    defaultValues: new DepartmentErpDbCompany(),
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const getErpDbCompanyList = async () => {
    ErpDbCompanyService.getErpDbCompanyList()
      .then((res: IErpDbCompanyDdlModel[]) => {
        setErpDbCompanyList(res);
        console.log("Success fetching erpDbCompany.", res);
      })
      .catch((error) => {
        console.log("Error fetching erpDbCompany.");
      })
      .finally(() => {
        console.log("Finally block of erpDbCompany.");
      });
  };

  const getDepartmentsByErpDbCompanyId = async (erpDbCompanyId: number) => {
    ErpDbCompanyService.getDepartmentsByErpDbCompanyId(erpDbCompanyId)
      .then((res: IDepartmentErpDbCompanyDDL[]) => {
        setDepartmentList(res);
        console.log(
          "Success fetching department based on erpDbCompanyId.",
          res
        );
      })
      .catch((error) => {
        console.log("Error fetching department based on erpDbCompanyId.");
      })
      .finally(() => {
        console.log("Finally block of  department based on erpDbCompanyId.");
      });
  };

  const getProgrammeByErpDbCompanyId = async (erpDbCompanyIds: string) => {
    ProgrammeService.getProgrammeByErpDbCompanyIds(erpDbCompanyIds)
      .then((res: IProgrammeModel[]) => {
        setProgrammeList(res);
        console.log("Success fetching erpDbCompany.", res);
      })
      .catch((error) => {
        console.log("Error fetching erpDbCompany.");
      })
      .finally(() => {
        console.log("Finally block of erpDbCompany.");
      });
  };

  useEffect(() => {
    getErpDbCompanyList();
  }, []);

  const erpDbCompanyId = methods.watch("erpDbCompanyId");

  useEffect(() => {
    if (erpDbCompanyId) {
      getDepartmentsByErpDbCompanyId(erpDbCompanyId);
      methods.setValue("departmentId",null);
      getProgrammeByErpDbCompanyId(erpDbCompanyId.toString());
    }
  }, [erpDbCompanyId]);

  const erpDbCompanyOptions = useMemo(() => {
    console.log("erpDbCompanyOptions:", erpDbCompanyList);
    return Shared.getDropdownOptions(erpDbCompanyList, "erpDbCompanyId");
  }, [erpDbCompanyList]);

  const departmentOptions = useMemo(() => {
    const tempList: IOption[] = [];
    departmentList.map((dept) =>
      tempList.push({
        label: dept.department.toString(),
        value: dept.departmentId.toString(),
      })
    );
    return tempList;
  }, [departmentList]);

  return (
    <>
      <Typography color="blue" variant="h2">
        ErpDbCompany list.
      </Typography>
      <br />
      <FormProvider {...methods}>
        <CustomAutoComplete
          name="erpDbCompanyId"
          label="ErpDbCompany"
          options={erpDbCompanyOptions}
          className="custom-drop-down"
        />{" "}
        &nbsp;
        <CustomAutoComplete
          name="departmentId"
          label="Department"
          options={departmentOptions}
          isDisabled={!erpDbCompanyId}
          className="custom-drop-down"
        />
      </FormProvider>
      <br />
      <br />

      <table className="master-table">
        <thead className="master-table-header-row">
          <tr>
            <th align="left">DepartmentId</th>
            <th align="left">Department</th>
            <th align="left">ErpDbCompanyId</th>
            <th align="left">ErpDbCompany</th>
          </tr>
        </thead>
        <tbody>
          {departmentList.length <= 0 && (
            <tr className="master-table-data-row">
              <td colSpan={4}>No Records Found!</td>
            </tr>
          )}
          {departmentList != null &&
            departmentList.map((cr) => (
              <tr
                className="master-table-data-row"
                key={cr.departmentErpDbCompanyId}
              >
                <td align="left">{cr.departmentId}</td>
                <td align="left">{cr.department}</td>
                <td align="left">{cr.erpDbCompanyId}</td>
                <td align="left">{cr.erpDbCompany}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />
      <br />

      <table className="master-table">
        <thead className="master-table-header-row">
          <tr>
            <th align="left">Programme</th>
            <th align="left">ProgrammeNumber</th>
            <th align="left">ErpDbCompanyId</th>
            <th align="left">ErpDbCompany</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programmeList.length <= 0 && (
            <tr className="master-table-data-row">
              <td colSpan={4}>No Records Found!</td>
            </tr>
          )}
          {programmeList != null &&
            programmeList.map((p) => (
              <tr className="master-table-data-row" key={p.programmeId}>
                <td align="left">{p.name}</td>
                <td align="left">{p.programmeNumber}</td>
                <td align="left">{p.erpDbCompanyId}</td>
                <td align="left">{p.erpDbCompanyName}</td>
                <td align="left">
                  <IconButton
                    size="small"
                    onClick={handleClick}
                    disabled={false}
                  >
                    <Avatar
                      variant="square"
                      src={menuThreeDotsDefaultIcon}
                      alt="Menu"
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem>view</MenuItem>
                    <MenuItem>add</MenuItem>
                    <MenuItem>delete</MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;
