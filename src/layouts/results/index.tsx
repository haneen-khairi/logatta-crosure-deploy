import { Box } from "@chakra-ui/react";

// import Navbar from "../../components/layouts/navbar";
import ResultsHeader from "./header";

interface props {
  children: React.ReactNode;
}

const ResultsLayout = ({ children }: props) => {
  return (
    <Box>
      <ResultsHeader />

      <Box mt="14" px="20" className="box-layout" py="10">
        {children}
      </Box>

      {/* <Navbar items={navItems} /> */}
    </Box>
  );
};

// const navItems = [
//   {
//     label: "Inspiration",
//     href: "#",
//   },
//   {
//     label: "Find Work",
//     children: [
//       {
//         label: "Job Board",
//         href: "#",
//       },
//     ],
//   },
// ];

export default ResultsLayout;
