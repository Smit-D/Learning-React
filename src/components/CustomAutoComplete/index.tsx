import React, { useEffect, useState } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { CustomeAutoCompleteProps } from "./CustomAutoComplete.Props";
import { IOption } from "../../utility/interfaces/select-option";

export const CustomAutoComplete: React.FC<CustomeAutoCompleteProps> = ({
  name,
  label,
  options,
  isDisabled,
  hideErrorMessage,
  className = "",
  onBeforeChange,
  handleChange,
}) => {
  const methods = useFormContext();
  const [value, setValue] = useState<IOption | null>(null);
  const selectedValue = methods.watch(name);

  useEffect(() => {
    const item = options.find((opt) => opt.value === selectedValue);
    setValue(item ? item : null);
  }, [selectedValue, options]);

  return (
    <FormControl className={className}>
      <Controller
        name={name}
        control={methods.control}
        render={({ field: { onChange, ref }, fieldState: { error } }) => (
          <Autocomplete
            disablePortal
            options={options.sort(
              (a, b) => -(b.groupBy || "").localeCompare(a.groupBy || "")
            )}
            disabled={isDisabled}
            clearIcon={false}
            className="auto-complete-dialog"
            value={value}
            groupBy={(option) => option.groupBy || ""}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: IOption | null
            ) => {
              onBeforeChange
                ? onBeforeChange(newValue)
                : onChange(newValue ? newValue.value : null);
              if (!onBeforeChange && handleChange) handleChange(newValue);
            }}
            isOptionEqualToValue={(option: IOption, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
                error={!!error}
                autoComplete="off"
                helperText={error && !hideErrorMessage ? error.message : null}
              />
            )}
            getOptionDisabled={(option) => !!option.disabledOptionTooltipText}
          />
        )}
      />
    </FormControl>
  );
};
