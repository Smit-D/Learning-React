export default class DepartmentErpDbCompany {
	erpDbCompanyId: number | null;
	departmentErpDbCompanyId: number;
	erpDbCompanyName?: string;
	costCentreCode: string;
	departmentId?: number | null;
	departmentName?: string;

	constructor() {
		this.erpDbCompanyId = null;
		this.departmentErpDbCompanyId = -1;
		this.erpDbCompanyName = "";
		this.costCentreCode = "";
		this.departmentId = null;
		this.departmentName = "";
	}
}
