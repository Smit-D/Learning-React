import { BaseService, ApiResponse, IApiResponse } from "./base.service";
import { IErpDbCompanyDdlModel, IDepartmentErpDbCompanyDDL } from "../models/ErpDbCompanyDdlModel";

class ErpDbCompanyServiceInternal extends BaseService {
  getErpDbCompanyList = async (): Promise<IErpDbCompanyDdlModel[]> =>
    this.callApi<IErpDbCompanyDdlModel[]>(
      `ErpDbCompany/GetErpDbCompanyList`,
      "GET"
    );

  getDepartmentsByErpDbCompanyId = async (
    erpDbCompanyId: number,
    isIncludeCompanyWide = false
  ): Promise<IDepartmentErpDbCompanyDDL[]> =>
    this.callApi<IDepartmentErpDbCompanyDDL[]>(
      `DepartmentErpDbCompany/GetDepartmentList`,
      "GET",
      new URLSearchParams({
        erpDbCompanyId: erpDbCompanyId.toString(),
				isIncludeCompanyWide: isIncludeCompanyWide.toString(),
      })
    );
    getDepartmentByDepartmentId = async (departmentId:number): Promise<any[]> =>
    this.callApi<any[]>(
      `Department/GetDepartment/${departmentId}`,
      "GET"
    );
}

export const ErpDbCompanyService = new ErpDbCompanyServiceInternal();
