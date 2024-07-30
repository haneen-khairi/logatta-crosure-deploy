import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { Fragment } from "react";

import { detailsProps } from ".";
import CardComp from "../../../components/cards";
import StatList from "../../../components/statList";
import BoxTitle from "../../../components/typography/BoxTitle";

interface props {
  data: detailsProps;
  reset: any;
}

const ResultsDetailsBox = ({ data, reset }: props) => {
  const stats = [
    // {
    //   color: "green",
    //   Icon: "/public/",
    //   title: "Price",
    //   stat: data.price_with_currency,
    // },
    // {
    //   color: "blue",
    //   Icon: TagLeftIcon,
    //   title: "Average Living Costs",
    //   stat: data.avg_living_costs_with_currency,
    // },
    {
      color: "blue",
      Icon: "/property_type.svg",
      title: "Property type",
      stat: data.property_type,
    },
    {
      color: "blue",
      Icon: "/bedrooms.svg",
      title: "Bedrooms Count",
      stat: data.bedrooms,
    },
    {
      color: "blue",
      Icon: "/bedrooms.svg",
      title: "Bathrooms Count",
      stat: data.bathrooms,
    },
    {
      color: "blue",
      Icon: "/check_right.svg",
      title: "Condition",
      stat: data.condition,
    },
    {
      color: "blue",
      Icon: "/storage.svg",
      title: "Storage",
      stat: data.storage ? "Yes" : "No",
    },
    {
      color: "blue",
      Icon: "/gardens.svg",
      title: "Gardens",
      stat: data.gardens,
    },
  ];

  return (
    <CardComp
      body={
        <Fragment>
          <Flex justifyContent="space-between" mb={3}>
            <BoxTitle title="Property Details" />

            <Text color="primary.500" role="button" onClick={reset}>
              Back <ChevronRightIcon />
            </Text>
          </Flex>

          <StatList stats={stats} />
        </Fragment>
      }
    />
  );
};

export default ResultsDetailsBox;
