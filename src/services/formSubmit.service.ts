import { BaseService, IApiResponse } from "./base.service";
import { FullFormModel } from "../models/fullFormModel";

class FormSubmitService extends BaseService{
    
	saveFormData = async (model: FullFormModel): Promise<IApiResponse> =>
    this.callApi<IApiResponse>(`ContractRegion/SaveFormData`, "POST", undefined, model);

    updateFormData = async (formId:number ,model: FullFormModel): Promise<IApiResponse> =>
    this.callApi<IApiResponse>(`ContractRegion/UpdateFormData/${formId}`, "PUT", undefined, model);
}

export const FormService = new FormSubmitService();