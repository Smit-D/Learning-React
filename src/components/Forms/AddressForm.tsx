import React, { useState, useMemo, useEffect } from "react";
import { TextField, Autocomplete, Typography, Box } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { DropDownType } from "../../models/dropDownModel";

export default function AddressForm() {
  const methods = useFormContext();
  // const handleCountryOnChange =(value:any) => {
    //   setValue(value);
    //   console.log('country value:', value)
    // }
    // // const selectedValues = React.useMemo(
      // //   () => countries.filter((v) => v.label),
      // //   [countries],
      // // );
      // const [value, setValue] = useState<DropDownType | null>(null);
    //   const selectedValue:number | null = methods.watch("countryId");
    //   const onHandleChange = (newItem:string | number| null) => {
    //   const item = countries.find((opt) => opt.value === selectedValue);
    //   setValue(item ? item : null);
    // }
  // useEffect(() => {
  //   console.log(selectedValue);
  // 	const item = countries.find((opt) => opt.label === selectedValue);
  // 	setValue(item ? item : null);
  // }, [selectedValue]);

  return (
    <div className="container">
      <Typography variant="h4">Address Form</Typography>
      <Controller
        name="addressLine1"
        control={methods.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="AddressLine1"
            variant="outlined"
            error={!!methods.formState?.errors?.addressLine1?.message}
            helperText={<>{methods.formState.errors?.addressLine1?.message} </>}
          />
        )}
      />
      <br />
      <Controller
        name="addressLine2"
        control={methods.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="AddressLine2"
            variant="outlined"
            error={!!methods.formState?.errors?.addressLine2?.message}
            helperText={<>{methods.formState.errors?.addressLine2?.message} </>}
          />
        )}
      />
      <br />
      <Controller
        name="countryId"
        control={methods.control}
        render={({
          field: { onChange,value, ref },
          fieldState: { error },
        }) => (
          <Autocomplete
            disablePortal
            options={countries}
            clearIcon={false}
            className="auto-complete-dialog"
            value={value}
            // defaultValue = {{label: "India", value: 1}}
            // isOptionEqualToValue={(option: DropDownType, value) =>
            //   option.value === value.value
            // } // groupBy={(option) => option.groupBy || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="country"
                inputRef={ref}
                error={!!error}
                autoComplete="off"
                helperText={error?.message}
              />
            )}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: DropDownType | null
            ) => {
              onChange(newValue ? newValue.value : null);
              //use state to remove error
              // onHandleChange(newValue ? newValue.value : null);
              // if (!onBeforeChange && handleChange) handleChange(newValue);
            }}
            // getOptionDisabled={(option) => !!option.disabledOptionTooltipText}
          />
        )}
      />
    </div>
  );
}

const countries: readonly DropDownType[] = [
  {
    label: "India",
    value: 1,
  },
  {
    label: "Australia",
    value: 2,
  },
  {
    label: "Amreica",
    value: 3,
  },
];
