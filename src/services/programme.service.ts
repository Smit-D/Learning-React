import { BaseService, ApiResponse, IApiResponse } from "./base.service";
import { IProgrammeModel } from "../models/programmeModel";

class ProgrammeServiceInternal extends BaseService {
  getProgrammeByErpDbCompanyIds = async (
    erpDbCompanyIds: string
  ): Promise<IProgrammeModel[]> =>
    this.callApi<IProgrammeModel[]>(
      `Programme/GetProgrammeByErpDbCompanyId/${erpDbCompanyIds}`,
      "GET"
    );

}
export const ProgrammeService = new ProgrammeServiceInternal();
