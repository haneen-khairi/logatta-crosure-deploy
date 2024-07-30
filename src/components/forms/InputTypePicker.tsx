import { Checkbox, Input } from "@chakra-ui/react";

import { borderRound, inputStyles } from "../../utils/consts";
import { computedInputProps } from "./FormRenderer";
import PasswordInput from "./PasswordInput";
import SelectMultiInput from "./SelectMultiInput";

const InputTypePicker = ({ 
  checked,
  checkedChartBox , 
  title, onChange, ...props }: computedInputProps) => {
  switch (props.type) {
    case "email":
      return (
        <Input
          {...props}
          ps="10"
          onChange={(e) => onChange(props.name, e.target.value)}
          errorBorderColor="red.300"
          borderRadius={borderRound}
          style={inputStyles}
          size="lg"
        />
      );
    case "password":
      return (
        <PasswordInput
          {...props}
          onChange={(e: any) => onChange(props.name, e.target.value)}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          colorScheme="primary"
          size="lg"
          defaultChecked={checked}
          onChange={(e) => onChange(props.name, e.target.checked)}
          {...props}
        >
          {title}
        </Checkbox>
      );
    case "selectMany":
      return <SelectMultiInput checkedChartBox={checkedChartBox} checked={true} onChange={onChange} {...props} />;
    default:
      return (
        <Input
          {...props}
          ps="10"
          size="lg"
          onChange={(e) => onChange(props.name, e.target.value)}
          borderRadius={borderRound}
          style={inputStyles}
        />
      );
  }
};

export default InputTypePicker;
