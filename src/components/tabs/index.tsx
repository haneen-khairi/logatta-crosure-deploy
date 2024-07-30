import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

interface props {
  tabs: { title: string; body: React.ReactNode }[];
}

const TabsComp = ({ tabs }: props) => {
  return (
    <Tabs colorScheme="primary">
      <TabList>
        {tabs.map(({ title }) => (
          <Tab fontWeight="semibold">{title}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ body }) => (
          <TabPanel>{body}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComp;
