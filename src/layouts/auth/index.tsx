import { Box, Image, SimpleGrid } from "@chakra-ui/react";
// import { Fragment } from "react";

import AuthPhoto from "../../assets/img/layout/auth.jpg";
import AuthHeader from "./Header";

interface props {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, icon, title, subtitle }: props) => {
  return (
    <Box h="100vh">
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box order={{ base: 2, md: 1 }} py={5} px={20} my="auto">
          <AuthHeader
            title={
              <p style={{display:'flex' , alignItems: 'center', justifyContent: 'flex-start', gap:'10px'}}>
                {icon}
                {title}
              </p>
            }
            subtitle={subtitle}
          />

          {children}
        </Box>

        <Image
          order={{ base: 1, md: 2 }}
          src={AuthPhoto}
          alt="AuthPhoto"
          h={{ base: "25vh", md: "100vh" }}
          minW="100%"
          overflow="hidden"
        />
      </SimpleGrid>
    </Box>
  );
};

export default AuthLayout;
