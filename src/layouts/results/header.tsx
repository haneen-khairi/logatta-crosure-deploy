import {
  Avatar,
  AvatarBadge,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

import LoadingIndicator from "../../components/loadingIndicator";
import Logo from "../../components/logo";
import SearchBar from "../../components/searchBar";
import { logout } from "../../redux/actions/auth";
import { clearPostcode, setPostcode } from "../../redux/actions/data";

const ResultsHeader = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Fragment>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="#1E1E1E"
        align="center"
        position="fixed"
        w="100%"
        left={0}
        right={0}
        top={0}
        mb={5}
        zIndex={9999}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Text
          onClick={()=> dispatch(clearPostcode())}
          style={{cursor: "pointer"}}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            {colorMode === 'light' ? <Logo  imageSrc="/logo_login.svg" size='200px' /> : <Logo  imageSrc="/light-logo-svg.svg" size='200px' /> }
          </Text>


        </Flex>
        <Flex display="flex" ml={10} gap={'24px'}>
            <SearchBar className="form_search" onSubmit={(e: string) => dispatch(setPostcode(e))} />
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Menu>
              <MenuButton>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
                  <AvatarBadge boxSize="1.25em" bg="primary.500" role="button" />
                </Avatar>
              </MenuButton>
              <MenuList>
              <MenuItem
                  onClick={toggleColorMode}
                >
                  Change theme to  {colorMode === 'light' ? 'Dark' : 'Light'}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearPostcode());
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          </Flex>
      </Flex>

      <LoadingIndicator />
    </Fragment>
  );
};

export default ResultsHeader;
