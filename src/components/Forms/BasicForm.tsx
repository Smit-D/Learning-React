import React, { Component } from "react";
import { TextField, Autocomplete, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
export default function BasicForm() {
  const methods = useFormContext();
  return (
    <div className="container">
      <Typography variant="h4">Basic Form</Typography>
      {/* <TextField
        variant="outlined"
        label="Email"
        name="email"
        style={{ margin: "10px" }}
        error={!!methods.formState?.errors?.email?.message}
        helperText={<>{methods.formState.errors?.email?.message} </>}
      >
        Email:
      </TextField> */}
      <Controller
        name="email"
        control={methods.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!methods.formState?.errors?.email?.message}
            helperText={<>{methods.formState.errors?.email?.message} </>}
          />
        )}
      />
      <Controller
        name="password"
        control={methods.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            variant="outlined"
            type="password"
            error={!!methods.formState?.errors?.password?.message}
            helperText={<>{methods.formState.errors?.password?.message} </>}
          />
        )}
      />
      <br />
       {/*<TextField
        variant="outlined"
        label="Password"
        type="password"
        name="password"
        error={!!methods.formState?.errors?.password?.message}
        helperText={<>{methods.formState?.errors?.password?.message} </>}
      >
        Password:
      </TextField> */}
    </div>
  );
}
