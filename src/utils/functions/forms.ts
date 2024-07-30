import { inputProps } from "../../components/forms/FormRenderer";

interface props {
  inputs: inputProps[];
}

interface dataProp {
  data: object;
}

type dataProps = props & dataProp;

type returns = string | number | boolean | [] | object;

const initialValueGenerator = ({ type = "", optionType = "" }): returns => {
  switch (type) {
    case "rate":
    case "number":
      return 0;
    case "range":
      return 0;
    case "checkbox":
      return false;
    case "boolean":
      return false;
    case "select":
      return initialValueGenerator({ type: optionType });
    case "radio":
      return initialValueGenerator({ type: optionType });
    case "radioButtons":
      return initialValueGenerator({ type: optionType });
    case "selectMany":
      return [];
    case "checkboxes":
      return [];
    case "list":
      return [];
    default:
      return "";
  }
};

const extractStackedInputs = ({ inputs }: props) => {
  // @ts-ignore
  const finalInputs = [];

  inputs?.forEach((input) =>
    input.type === "inputs"
      ? input.inputs
          // @ts-ignore
          ?.filter((stacked) => !stacked.text)
          ?.forEach((stacked) => finalInputs.push(stacked))
      : finalInputs.push(input)
  );

  // @ts-ignore
  return finalInputs;
};

export const initialValuesGenerator = ({ inputs }: props) =>
  extractStackedInputs({ inputs })
    ?.map((input) => ({
      [input.name]:
        input.defaultValue ||
        initialValueGenerator({
          type: input.type,
          optionType: input.optionType,
        }),
    }))
    .reduce((final, value) => ({ ...final, ...value }), {});

const requiredValidatorGenerator = ({ input }: { input: inputProps }) => {
  switch (input.required) {
    case true:
      return { [input.name]: "This is Required" };
    default:
      return {};
  }
};

const listTypes = ["checkboxes", "selectMany", "list"];

export const requiredValidatorsGenerator = ({ data, inputs }: dataProps) =>
  extractStackedInputs({ inputs })
    ?.filter((input) =>
      listTypes.includes(input.type)
        ? !(data as any)[input.name]?.length
        : !(data as any)[input.name]
    )
    ?.map((input) => requiredValidatorGenerator({ input }));

const typeValidatorGenerator = ({
  data,
  input,
}: {
  data: dataProp;
  input: inputProps;
}): returns => {
  const { name, type, optionType } = input;

  const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validUrlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const validPhoneNoRegex =
    /((\+9627|07))?[0-9]{1,2}[.\- ]?[0-9]{3,4}[.\- ]?[0-9]{3,4}/;

  switch (type) {
    case "rate":
    case "number":
      return typeof data !== type ? { [name]: "This Should Be a Number" } : {};
    case "range":
      return typeof data !== "number"
        ? { [name]: "This Should Be a Number" }
        : {};
    case "checkbox":
      return typeof data !== "boolean"
        ? { [name]: "This Should Be a True OR False" }
        : {};
    case "boolean":
      return typeof data !== "boolean"
        ? { [name]: "This Should Be a True OR False" }
        : {};
    case "richText":
      return typeof data !== "object"
        ? { [name]: "This Should Be a Complex Data" }
        : {};
    case "select":
      return typeValidatorGenerator({
        data,
        input: { ...input, type: optionType },
      });
    case "radio":
      return typeValidatorGenerator({
        data,
        input: { ...input, type: optionType },
      });
    case "radioButtons":
      return typeValidatorGenerator({
        data,
        input: { ...input, type: optionType },
      });
    case "selectMany":
      return typeof data !== "object"
        ? { [name]: "This Should Be an Array" }
        : {};
    case "checkboxes":
      return typeof data !== "object"
        ? { [name]: "This Should Be an Array" }
        : {};
    case "email":
      // @ts-ignore
      return typeof data !== "string" || !data.match(validEmailRegex)
        ? { [name]: "This Should Be an Email" }
        : {};
    case "url":
      // @ts-ignore
      return typeof data !== "string" || !data.match(validUrlRegex)
        ? { [name]: "This Should Be a URL" }
        : {};
    case "phoneNo":
      // @ts-ignore
      return typeof data !== "string" || !data.match(validPhoneNoRegex)
        ? { [name]: "This Should Be a Phone Number" }
        : {};
    default:
      return typeof data !== "string"
        ? { [name]: "This Should Be a String" }
        : {};
  }
};

const typesNotToValidate = [
  ...listTypes,
  "checkbox",
  "select",
  "radio",
  "radioButtons",
  "day",
  "year",
];

export const typeValidatorsGenerator = ({ data, inputs }: dataProps) =>
  extractStackedInputs({ inputs })
    ?.filter((input) => (data as any)[input.name])
    ?.filter((input) => !typesNotToValidate.includes(input.type))
    ?.map((input) =>
      typeValidatorGenerator({ data: (data as any)[input.name], input })
    );

const edgeCaseValidatorGenerator = ({
  data,
  input,
}: {
  data: any;
  input: inputProps;
}) => {
  const { name, min, max, minLength, maxLength, exclude, include, type } =
    input;

  let errors = {};

  if (min && data < min) {
    errors = {
      ...errors,
      [name]: "This Should Not Be Smaller Than",
    };
  }

  if (max && data > max) {
    errors = {
      ...errors,
      [name]: "This Should Not Be Bigger Than",
    };
  }

  if (minLength && data?.length < minLength) {
    let newError = {};

    if (listTypes.includes(type || "")) {
      newError = {
        [name]: "You Need to Have Minimum Inputs of",
      };
    } else {
      newError = {
        [name]: "This Should Not Be Shorter Than",
      };
    }

    errors = {
      ...errors,
      ...newError,
    };
  }

  if (maxLength && data?.length > maxLength) {
    let newError = {};

    if (listTypes.includes(type || "")) {
      newError = {
        [name]: "You Need to Have Maximum Inputs of",
      };
    } else {
      newError = {
        [name]: "This Should Not Be Longer Than",
      };
    }

    errors = {
      ...errors,
      ...newError,
    };
  }

  if (exclude) {
    const dataToCheck = data.toLowerCase();
    const notExcluded = [];

    exclude?.forEach((ex) =>
      dataToCheck.includes(`${ex}`.toLowerCase()) ? notExcluded.push(ex) : ""
    );

    if (notExcluded?.length) {
      errors = {
        ...errors,
        [name]: "This Should Not Include",
      };
    }
  }

  if (include) {
    const dataToCheck = data.toLowerCase();
    const notIncluded = [];

    include?.forEach((ex) =>
      !dataToCheck.includes(`${ex}`.toLowerCase()) ? notIncluded.push(ex) : ""
    );

    if (notIncluded?.length) {
      errors = {
        ...errors,
        [name]: "This Should Include",
      };
    }
  }

  return errors;
};

export const edgeCaseValidatorsGenerator = ({ data, inputs }: dataProps) =>
  extractStackedInputs({ inputs })
    ?.filter((input) => (data as any)[input.name])
    ?.map((input) =>
      edgeCaseValidatorGenerator({ data: (data as any)[input.name], input })
    );

export const allValidatorsGenerator = ({ data, inputs }: dataProps) => {
  const final = [{}];

  requiredValidatorsGenerator({ data, inputs })?.forEach((rule) =>
    final.push(rule)
  );

  typeValidatorsGenerator({ data, inputs })?.forEach((rule) =>
    final.push(rule)
  );

  edgeCaseValidatorsGenerator({ data, inputs })?.forEach((rule) =>
    final.push(rule)
  );

  return final;
};

export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,14}$/;
// 8 - 14 characters, at least one uppercase letter, one lowercase letter and one number

/*
  Min 8 characters, at least one letter and one number
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  Min 8 characters, at least one letter, one number and one special character
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/

  Min 8 characters, at least one uppercase letter, one lowercase letter and one number
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  Min 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  8 - 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
*/

/*
  At least one upper case English letter:  (?=.*[A-Z])
  At least one lower case English letter:  (?=.*[a-z])
  At least one digit:                      (?=.*[0-9])
  At least one special character:          (?=.*[#?!@$%^&*-])
  Min eight in length:                     .{8,} (with the anchors)
*/
