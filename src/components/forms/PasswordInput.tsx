import { ViewIcon } from "@chakra-ui/icons";
import { Input, InputRightElement } from "@chakra-ui/react";
import { Fragment, useState } from "react";

import { borderRound, inputStyles } from "../../utils/consts";
import { computedInputProps } from "./FormRenderer";

const PasswordInput = ({ type, ...props }: computedInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Fragment>
      <Input
        {...props}
        type={showPassword ? "text" : type}
        ps="10"
        size="lg"
        borderRadius={borderRound}
        style={inputStyles}
      />

      <InputRightElement>
        <ViewIcon
          color="primary.500"
          role="button"
          onClick={() => setShowPassword((current) => !current)}
        />
      </InputRightElement>
    </Fragment>
  );
};

export default PasswordInput;
