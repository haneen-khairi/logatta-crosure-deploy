import { Box } from "@chakra-ui/react";

import Navbar from "../../components/layouts/navbar";
import LoadingIndicator from "../../components/loadingIndicator";
import Logo from "../../components/logo";
import { primaryLightColor, secondaryLightColor } from "../../utils/consts";

interface props {
  children: React.ReactNode;
}

const SearchEngineLayout = ({ children }: props) => {
  return (
    <Box
      h="100vh"
      backgroundImage={`linear-gradient(to right, ${primaryLightColor}, ${secondaryLightColor})`}
      pt="30vh"
    >
      <Box mx={{ base: 10, md: 40, lg: 200, xl: 460 }}>
          <Logo imageSrc="/logo_search.svg" noText size="100px" className="m-auto"  />
          <h3 className="searcharea__header">Commsure</h3>
          <p className="searcharea__paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

        {/* <Text fontSize="sm" opacity={0.5} textAlign="center" my={3}>
          This is the subtitle
        </Text> */}
        <LoadingIndicator />

        <Box my={{ base: 10, lg: 10 }}>{children}</Box>
      </Box>

      <Navbar items={navItems} />
    </Box>
  );
};

const navItems = [
  {
    label: "Advertising",
    href: "#",
  },
  {
    label: "Business",
    href: "#",
  },
  {
    label: "About",
    href: "#",
  },
];

export default SearchEngineLayout;
