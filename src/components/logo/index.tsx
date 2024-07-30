import { Flex, Image } from "@chakra-ui/react";
import { Fragment } from "react";

// import logo from "../../assets/img/brand/logo-photo.png";
// import logoFullHWhite from "../../assets/img/brand/logo-white.svg";
// import logoFullH from "../../assets/img/brand/logo.svg";

const Logo = ({
  noText = false,
  vertical = false,
  // white = false,
  size = "200px",
  imageSrc = "/logo_login.svg",
  className,
  props
}: any) => {
  // const pickedLogo = white ? logoFullHWhite : logoFullH;

  return (
    <Fragment>
      {noText ? (
        <Image src={imageSrc} w={size}  {...props} className={className} />
      ) : vertical ? (
        <Fragment>
          <Image src={imageSrc} w={size}  {...props} className={className} />
        </Fragment>
      ) : (
        <Flex textAlign="center" alignItems="center" alignContent="center">
          <Image src={imageSrc} w={size} me={2} {...props} className={className} />
        </Flex>
      )}
    </Fragment>
  );
};

export default Logo;
