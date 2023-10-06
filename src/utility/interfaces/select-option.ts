export interface IOption {
	label: string;
	value: number | string;
	groupBy?: string;
	disabledOptionTooltipText?: string;
}

export interface IBoolOption {
	label: string;
	value: boolean;
}
