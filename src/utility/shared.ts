import { IOption } from "./interfaces/select-option";

export class Shared{
    // convert item list to IOption[], required for drop-downs/auto complete
	public static getDropdownOptions = (
		itemList: any,
		valueProperty: string,
		labelProperty: string = "",
		isConvertValueToString: boolean = false,
		groupByProperty: string = ""
	) => {
		const tempList: IOption[] = [];
		itemList.map((item: any) =>
			tempList.push({
				label: labelProperty ? item[labelProperty] : item.name,
				value: isConvertValueToString
					? item[valueProperty].toString()
					: item[valueProperty],
				groupBy: groupByProperty ? item[groupByProperty] : "",
			})
		);
		return tempList;
	};
}