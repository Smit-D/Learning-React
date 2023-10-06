import React from 'react'
import { IOption } from "../../utility/interfaces/select-option";

export interface CustomeAutoCompleteProps{
    name: string;
	label: string;
	options: IOption[];
	isDisabled?: boolean;
	hideErrorMessage?: boolean;
	className?: string;
	onBeforeChange?: (value: IOption | null) => void;
	handleChange?: (value: IOption | null) => void;
}