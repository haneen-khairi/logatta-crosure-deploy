import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";

import { borderHalfRound } from "../../utils/consts";
import BoxTitle from "../typography/BoxTitle";

interface props {
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardComp = ({ title, body, footer }: props) => {
  return (
    <Card
      variant="outline"
      w="100%"
      borderRadius={borderHalfRound}
      borderColor="blackAlpha.500"
    >
      {title && (
        <CardHeader>
          <BoxTitle title={title} />
        </CardHeader>
      )}
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardComp;
