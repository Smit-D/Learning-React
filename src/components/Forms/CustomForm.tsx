import React, { Component, HtmlHTMLAttributes } from "react";
import BasicForm from "./BasicForm";
import AddressForm from "./AddressForm";
import { Button, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FullFormModel } from "../../models/fullFormModel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormService } from "../../services/formSubmit.service";
import { IApiResponse } from "../../services/base.service";
export default function CustomForm(props: any) {
  const validationSchema = yup.object().shape({
    email: yup.string().nullable().email().required("Email is required!"),
    password: yup.string().nullable().required("Password is required!"),
    addressLine1: yup
      .string()
      .nullable()
      .required("Address Line 1 is required!"),
    addressLine2: yup.string().nullable(),
    countryId: yup.number().nullable().required("Country is required!"),
  });
  const methods = useForm<FullFormModel>({
    // defaultValues: new FullFormModel(),
    // mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitForm = async (data: FullFormModel) => {
    try {
      if (data.countryId === 1) {
        // const a = FormService.saveFormData(data);
        await FormService.saveFormData(data);
        console.log('save complete');
      } else {
        await FormService.updateFormData(1,data)
        console.log('update complete');
      }
    } catch (err) {
      console.log("error save form data: ", err);
    } finally {
      console.log("save/update form data reached finnaly block.");
    }
  };
  
  return (
    <div className="main-container">
      <FormProvider {...methods}>
        <Typography variant="h2">Full Form</Typography>
        <BasicForm />
        <br />
        <AddressForm />
        <br />
        <br />
        <Button variant="contained" onClick={methods.handleSubmit(submitForm)}>
          Submit
        </Button>
      </FormProvider>
    </div>
  );
}
