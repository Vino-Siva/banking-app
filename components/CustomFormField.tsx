"use client";

import React, { useEffect, useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
import { z } from "zod";

interface CustomFormFieldProps {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  type: "tel" | "text" | "email" | "password" | "number";
  placeholder: string;
  autoComplete?: "on" | "off";
  label: string;
}

const CustomFormField = ({
  control,
  name,
  type,
  label,
  placeholder,
  autoComplete = "on",
}: CustomFormFieldProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label" htmlFor={type}>
              {label}
            </FormLabel>
            <div className="flex flex-col w-full">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={type}
                  autoComplete={autoComplete}
                  id={type}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default CustomFormField;
