import { Text } from "@chakra-ui/react";

interface props {
  title?: string;
}

const BoxTitle = ({ title }: props) => {
  return (
    <Text fontSize="xl" fontWeight="bold" textAlign="start" color="primary.500">
      {title}
    </Text>
  );
};

export default BoxTitle;
