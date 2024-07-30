import { Checkbox, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

import { computedInputProps } from "./FormRenderer";


const SelectMultiInput = ({ onChange, checkedChartBox , checked, ...props }: computedInputProps) => {
  console.log('=== checkedChartBox ===', checkedChartBox)
  return (
    <Popover >
      <PopoverTrigger >
        <Input
          colorScheme="primary"
          size="lg"
          {...props}
          borderRadius={'24px'}
          value={props.value
            .map(
              (v: string | number | boolean) =>
                props.options?.find((o) => o.value == v)?.label
            )
            .join(", ")}
        />
      </PopoverTrigger>

      {checkedChartBox ? 
      <PopoverContent zIndex={99999999} className="PopoverContent">
      <PopoverBody >
        {props.options?.map(({ value, label }, i) => (
          <Checkbox
            colorScheme="primary"
            size="lg"
            defaultChecked={checkedChartBox.includes(value)}
            onChange={() =>
              onChange(
                props.name,
                props.value?.includes(value)
                  ? props.value?.filter(
                      (v: string | boolean | number) => v !== value
                    )
                  : [...props.value, value]
              )
            }
            {...props}
            checked={props.value.includes(value)}
            width="100%"
            my={3}
            key={i}
          >
            {label}
          </Checkbox>
        ))}
      </PopoverBody>
    </PopoverContent>
      :<PopoverContent zIndex={99999999} className="PopoverContent">
        <PopoverBody >
          {props.options?.map(({ value, label }, i) => (
            <Checkbox
              colorScheme="primary"
              size="lg"
              // defaultChecked={checkedChartBox.includes(value)}
              onChange={() =>
                onChange(
                  props.name,
                  props.value?.includes(value)
                    ? props.value?.filter(
                        (v: string | boolean | number) => v !== value
                      )
                    : [...props.value, value]
                )
              }
              {...props}
              checked={props.value.includes(value)}
              width="100%"
              my={3}
              key={i}
            >
              {label}
            </Checkbox>
          ))}
        </PopoverBody>
      </PopoverContent>}
    </Popover>
  );
};

export default SelectMultiInput;
