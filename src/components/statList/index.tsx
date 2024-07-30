import { Flex, IconButton, Image, Text } from "@chakra-ui/react";

interface props {
  stats: {
    color?: string;
    Icon: any;
    title: string;
    stat?: number | string;
  }[];
}

const StatList = ({ stats }: props) => {
  console.log('=== StatList ===', stats);
  
  return stats.map(({ Icon, title, stat }, i) => (
    <Flex justifyContent="space-between" key={i} my={4}>
      <Text>
        <IconButton
          isRound
          aria-label="Done"
          // colorScheme={color}
          fontSize="20px"
          me={2}
          cursor="default"
          icon={<Image src={Icon} />}
        />
        {title}
      </Text>

      <Text>{stat === undefined ? 0 : stat}</Text>
    </Flex>
  ));
};

export default StatList;
