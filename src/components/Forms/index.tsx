import React from "react";
import CustomForm from "../Forms/CustomForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
// import { FullFormModel } from "./models/fullFormModel";
export default function Form() {
  return (
    <>
      <CustomForm />
    </>
  );
}
