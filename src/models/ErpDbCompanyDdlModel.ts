export interface IErpDbCompanyDdlModel{
    erpDbCompanyId: number,
    name:string,
    isIncludeProgInGlFormat: boolean,
    glAccountFormat: string
}
export interface IDepartmentErpDbCompanyDDL {
	departmentErpDbCompanyId: number,
	departmentId: number,
	erpDbCompanyId: number,
	erpDbCompany: string,
    department: string,
    departmentDescription: string,
}
