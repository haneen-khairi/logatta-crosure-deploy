import { Box, Divider, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

import LoadingIndicator from "../../components/loadingIndicator";
import Logo from "../../components/logo";

interface props {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

const AuthHeader = ({ title, subtitle }: props) => {
  const { colorMode } = useColorMode()

  return (
    <Box pb="3">
      {colorMode === 'light' ? <Logo  imageSrc="/logo_login.svg" size='200px' /> : <Logo  imageSrc="/light-logo-svg.svg" size='200px' /> }

      <Divider my={5} borderColor="darkgray" borderWidth="1px" />

      <Text fontSize="2xl" fontWeight="bold" mt={20}>
        {title}
      </Text>

      <Text fontSize="sm" opacity={0.35} my={2}>
        {subtitle}
      </Text>

      <LoadingIndicator />
    </Box>
  );
};

export default AuthHeader;
