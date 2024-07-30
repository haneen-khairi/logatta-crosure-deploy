import { Progress, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const LoadingIndicator = ({ spinner = false }) => {
  const { loading } = useSelector(
    (_: { loading: { loading: string } }) => _.loading
  );

  return loading.length ? (
    spinner ? (
      <Spinner color="primary.500" />
    ) : (
      <Progress size="xs" isIndeterminate colorScheme="primary" my={2} />
    )
  ) : null;
};

export default LoadingIndicator;
