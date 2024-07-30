import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { Fragment } from "react";
import { computedInputProps } from "./FormRenderer";
import InputTypePicker from "./InputTypePicker";

const InputGroupComp = ({
  checked,
  beforeIcon,
  afterIcon,
  ...props
}: computedInputProps) => {
  return (
    <Fragment>
      {beforeIcon && <InputLeftElement>{beforeIcon}</InputLeftElement>}

      {props.type === "email" ? (
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="primary.500" />
        </InputLeftElement>
      ) : props.type === "password" ? (
        <InputLeftElement pointerEvents="none">
          <LockIcon color="primary.500" />
        </InputLeftElement>
      ) : (
        ""
      )}

      <InputTypePicker checked={checked} {...props} />

      {afterIcon && <InputRightElement>{afterIcon}</InputRightElement>}
    </Fragment>
  );
};

export default InputGroupComp;
