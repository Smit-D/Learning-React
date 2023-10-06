import { BaseService, ApiResponse, IApiResponse } from "./base.service";
import { IContractRegionModel } from "../models/contractregionModel";

class ContractRegionServiceInternal extends BaseService {
  getContractRegionByContractId = async (
    contractId: number
  ): Promise<IContractRegionModel[]> =>
    this.callApi<IContractRegionModel[]>(
      `ContractRegion/GetAll/${contractId}`,
      "GET"
    );

  deleteContractRegionByContractId = async (
    contractId: BigInt
  ): Promise<IApiResponse> =>
    this.callApi<IApiResponse>(
      `ContractRegion/DeleteContractRegionByContractId/${contractId}`,
      "DELETE"
    );
}
export const ContractRegionService = new ContractRegionServiceInternal();
