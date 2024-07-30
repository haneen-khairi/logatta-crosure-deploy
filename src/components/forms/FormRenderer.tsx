import { Box, Button, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

import { borderRound } from "../../utils/consts";
import {
  allValidatorsGenerator,
  initialValuesGenerator,
} from "../../utils/functions/forms";
import InputRenderer from "./InputRenderer";

export interface inputProps {
  placeholder?: string;
  title?: string;
  checked?: boolean;
  name: string;
  type?: string;
  optionType?: string;
  options?: { value: string | number | boolean; label: string }[];
  required?: boolean;
  fullWidth?: number| boolean;
  double?: boolean;
  triple?: boolean;
  text?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  exclude?: string[];
  include?: string[];
  inputs?: object[];
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  excludeInForm?: boolean;
  backgroundColor?: string;
}

interface computedProps {
  value: any;
  checkedChartBox?: any,
  onChange: any;
  formik?: { errors: object; values: object; touched: object };
  onBlur?: any;
}

export type computedInputProps = inputProps & computedProps;

export interface dynamicObject {
  [key: string | number]: any;
}

interface props {
  inputs: inputProps[];
  onSubmit: any;
  data?: object;
  map?: boolean,
  customValidations?: object[];
  extraValidations?: object[];
  submitText?: string;
}

const FormRenderer = ({
  inputs,
  onSubmit,
  data,
  map,
  customValidations,
  extraValidations,
  submitText,
}: props) => {
  const { colorMode } = useColorMode()
 
  const formik = useFormik({
    initialValues: {
      ...initialValuesGenerator({
        inputs: inputs.filter(({ excludeInForm }) => !excludeInForm),
      }),
      ...data,
    },
    validate: (formData) => {
      let errors = {};

      if (customValidations) {
        customValidations.forEach((validator) => {
          errors = { ...errors, ...validator };
        });
      } else {
        allValidatorsGenerator({
          data: formData,
          inputs: inputs.filter(({ excludeInForm }) => !excludeInForm),
        })?.forEach((validator) => {
          errors = { ...errors, ...validator };
        });

        extraValidations?.forEach((validator) => {
          errors = { ...errors, ...validator };
        });
      }

      return errors;
    },
    onSubmit: (formData) => {
      onSubmit(formData);
    },
  });

  return (
    <Box w="100%" style={map ? {paddingTop: '18px'}: {}}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        {map ? 
        <div className="grid-inputs">
        {inputs.map(
          ({ required, min, max, minLength, checked, maxLength, ...input }, i) => (
              <InputRenderer
              map={map}
                checked={checked}
                formik={formik}
                onBlur={() => {
                  formik?.setFieldTouched(input.name, true);
                }}
                value={(formik.values as dynamicObject)[input.name]}
                onChange={formik.setFieldValue}
                {...input}
                key={i}
              />

          )
        )}

        <GridItem>
          <Button
            w="100%"
            colorScheme="primary"
            type="submit"
            borderRadius={borderRound}
            py="7"
            color={colorMode === 'light' ? '#040404' : '#fff'}
            >
            {submitText || "Submit"}
          </Button>
        </GridItem>
            </div>
        :
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          {inputs.map(
            ({ required, min, max, minLength, maxLength, ...input }, i) => (
              
              <InputRenderer
                formik={formik}
                onBlur={() => {
                  formik?.setFieldTouched(input.name, true);
                }}
                value={(formik.values as dynamicObject)[input.name]}
                onChange={formik.setFieldValue}
                {...input}
                key={i}
              />
            )
          )}

          <GridItem colSpan={12}>
            <Button
              w="100%"
              colorScheme="primary"
              type="submit"
              borderRadius={borderRound}
              py="7"
            >
              {submitText || "Submit"}
            </Button>
          </GridItem>
        </Grid>}
      </form>
    </Box>
  );
};

export default FormRenderer;
