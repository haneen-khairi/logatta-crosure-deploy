import Chart from "react-apexcharts";
import React from "react";
import { useColorMode } from "@chakra-ui/react";

const AreaChart = React.memo(({ data }: { data: any }) => {

  const {colorMode} = useColorMode()

  function transformData(inputData: any) {
    const categories: any[] = [];
    const series: any[] = [];

    // Assuming the years are the same for all types, we can use the first type to get the years
    inputData[0]?.stats?.forEach((stat: any) => {
      categories.push(stat.year);
    });

    // Process each type of incident
    inputData?.forEach((type: any) => {
      const seriesData = type.stats.map((stat: any) => {
        if (stat.stats !== undefined) {
          return stat.stats
        } else {
          return stat.incidents_count
        }
      });
      series.push({ name: type.type, data: seriesData });
    });

    return {
      // theme: {
      //   mode: "dark"
      // },

      options: {
        xaxis: { categories },
        tooltip: {
          theme: 'dark'
        },
        theme: {
          mode: "dark"
        }
      },
      series
    };
  }



  // Transforming the data
  const transformedData = transformData(data);
  // setDataChart(example)

  return (
    <Chart

      options={{
        xaxis: { categories: transformedData.options.xaxis.categories },
        tooltip: { theme: colorMode === 'light' ? 'light' : 'dark' }, // Set theme to 'dark' or 'light'
        theme: { mode: colorMode === 'light' ? "light" : 'dark' }, // Use light as default if no theme provided
      }}
      series={transformedData.series}
      type="area"
      width="100%"
    />
  );
});

export default AreaChart;
