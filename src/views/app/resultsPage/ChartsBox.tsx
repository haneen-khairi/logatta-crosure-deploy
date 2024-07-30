import { Button, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as StatsAPI from "../../../api/search/stats";
import CardComp from "../../../components/cards";
import TabsComp from "../../../components/tabs";
import BoxTitle from "../../../components/typography/BoxTitle";
import AreaChart from "./AreaChart";
// import SelectComponent from "../../../components/SelectComponent";
import InputTypePicker from "../../../components/forms/InputTypePicker";
import * as XLSX from "xlsx"


const ResultsChartsBox = () => {
  const [stats, setStats] = useState({ fires: [
    {
      type: "",
      stats : []
    }
  ], crimes: [
    
      {
        type: "",
        stats : []
      }
    
  ] });
  const [crimesStats, setCrimesStats] = useState<any[]>([])
  const [firesStats, setFiresStats] = useState<any[]>([])

  // async function getFireIncidents(){
  //   try {
  //     const response = await StatsAPI.fireIncidents()
  //   } catch (error) {
      
  //   }
  // }
  // const [defaultValue, setDefaultValue] = useState<number>(0)
  const [chartSelectedOptions, setChartSelectedOptions] = useState({
    fires: [
      "Chimney fire",
      "Secondary Fire - accidental",
      "Secondary Fire - deliberate",
      "Primary fire - buildings"
    ],
    crimes: [
      "Criminal damage and arson",
      "Drugs",
      "Other crime",
      "theft",
      "Possession of weapons",
      "Public order",
      "Robbery",
      "Vehicle crime",
      "Violence and sexual offences"
    ],
  });
  // const crimesOptions = [
  //   {label: 'Criminal damage and arson', value:'Criminal damage and arson'} , 
  //   {label:'Drugs',value: 'Drugs'}, 
  //   {label: 'Other crime',  value: 'Other crime'} ,
  //   {label: 'theft',  value: 'theft'} ,
  //   {label: 'Possession of weapons',  value: 'Possession of weapons'} ,
  //   {label: 'Public order',  value: 'Public order'} ,
  //   {label: 'Robbery',  value: 'Robbery'} ,
  //   {label: 'Vehicle crime',  value: 'Vehicle crime'} ,
  //   {label: 'Violence and sexual offences' , value: 'Violence and sexual offences'} 
  // ]
  // const incidentsOptions = [
  //   {label: 'Chimney fire', value: 'Chimney fire'},
  //   {label: 'Secondary Fire - accidental', value: 'Secondary Fire - accidental'},
  //   {label: 'Secondary Fire - deliberate', value: 'Secondary Fire - deliberate'},
  //   {label: 'Primary fire - buildings', value: 'Primary fire - buildings'}
  // ]
  const { postcode } = useSelector(
    (_: { data: { postcode: string } }) => _.data
  );
  function sumAllYears(dataArray: any[]) {
    return dataArray.reduce((total: any, item: any) => {
      return total + item.stats.reduce((yearTotal: any, yearData: any) => {
        return yearTotal + yearData.stats;
      }, 0);
    }, 0);
  }
  function calculateYearStats(dataArray: any, key: string) {
    const yearStats: any = {};
  
    dataArray.forEach((item: any) => {
      item.stats.forEach((yearData: any) => {
        const year = yearData.year;
        const stats = yearData[key];
        yearStats[year] = (yearStats[year] || 0) + stats;
      });
    });
  
    return yearStats;
  }
  function sumAllYearsFires(dataArray: any[]) {
    return dataArray.reduce((total: any, item: any) => {
      return total + item.stats.reduce((yearTotal: any, yearData: any) => {
        return yearTotal + yearData.incidents_count;
      }, 0);
    }, 0);
  }
  function convertToArrayOfObjects(yearStatsObject: any) {
    return Object.entries(yearStatsObject).map(([year, totalStats]) => ({ year: Number(year), totalStats }));
  }
  function exportToExcel(dataArray: any, name: any) {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a blob and download the file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);   
  
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);   
  
  }
  useEffect(() => {
    StatsAPI.crimes({
      postcode,
      start: "07-2020",
      count: 5,
      types: chartSelectedOptions.crimes,
    }).then((crimes: any) => {
      // @ts-ignore
      console.log('=== crimes ===',crimes)
      const sumOfCrimes = sumAllYears(crimes)
      const sumOfCrimesTable = calculateYearStats(crimes, 'stats')
      const sumOfCrimesTableArray = convertToArrayOfObjects(sumOfCrimesTable)
      setCrimesStats(sumOfCrimesTableArray)

      console.log("🚀 ~ useEffect ~ sumOfCrimes:", sumOfCrimes , sumOfCrimesTableArray)
      console.log('=== crimes includes ===', chartSelectedOptions.crimes.includes('type'))
      if(crimes[0].type === undefined){
        setStats((current) => ({ 
          ...current, 
          crimes: [
            {
              type: 'all' , 
              stats: crimes
            }
          ]
        }));
      }else{
        setStats((current) => ({ ...current, crimes }));
      }
    });

    StatsAPI.fires({
      postcode,
      start_year: 2010,
      count: 13,
      types: chartSelectedOptions.fires,
    }).then((fires: any) => {
      // @ts-ignore
      console.log('=== fires ===', fires)
      const sumOfFires = sumAllYearsFires(fires)
      const sumOfFiresTable = calculateYearStats(fires, 'incidents_count')
      const sumOfFiresTableArray = convertToArrayOfObjects(sumOfFiresTable)
      setFiresStats(sumOfFiresTableArray)
      console.log("🚀 ~ useEffect ~ sumOffires:", sumOfFires, sumOfFiresTableArray)
      if(fires[0].type === undefined){
        setStats((current) => ({ 
          ...current, 
          fires: [
            {
            type: 'all' , 
            stats: fires
            }
          ]
        }));
      }else{
        setStats((current) => ({ ...current, fires }));

      }
      console.log('=== fires ===',stats)

    });
    console.log('=== stats ===', stats)
    
  }, [postcode, chartSelectedOptions]);
  const ChartCard = ({
    title = "",
    name = "",
    label = "",
    options = [""],
    data,
  }: any) => (
    <Fragment>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <GridItem>
          <BoxTitle title={title} />
          <Text my={4}>
            {/* {console.log('=== stats =====', Object.values(data))} */}
            {/* {Object.values(data)?.reduce(
              // @ts-ignore
              (final = 0, current = 0) => (final += current),
              0
            )}{" "} */}
            {label}
          </Text>
        </GridItem>
        {/* <TableComponent
                data={locations?.filter(
                  (location) => location?.type === "property"
                )}
                headers={[
                  {
                    key: "incidents_count",
                    name: "incidents count",
                  },
                  {
                    key: "year",
                    name: "Year Range",
                  },
                ]}
                tableName={"fire_incidents"}
              /> */}
              <Button
              w="fit-content"
              colorScheme="primary"
              type="submit"
              color={'#fff'}
              borderRadius={'50px'}
              fontSize={'14px'}
              // style={{
              //   // width: 'fit-content',
              //   margin: '0 auto'
              // }}
              // borderRadius={borderRound}
              py="7"
              onClick={() => name === "crimes" ?
                exportToExcel(crimesStats, title) : exportToExcel(firesStats, title)
              }
            >
              Download table 
              {/* {tableName} in Excel */}
            </Button>
        <GridItem className="grid-column-select">
          {/* <SelectComponent
          id={`data_crimes_${name}`}
          // defaultValue={defaultValue}
          // name={name}
          allOptions={
            name === 'crimes' ? crimesOptions : incidentsOptions
          }
          isMulti={true}
          getInitialDataBack={(data:any) => {
            let dataConvertedIntoStringArray = data.map((item: any) => item.value)
            console.log('=== value ===', dataConvertedIntoStringArray)
            console.log('=== name ===', name)
            setChartSelectedOptions((current) => ({
              ...current,
              [name]: dataConvertedIntoStringArray,
            }))
            // let indexedCrimeMethod = crimesOptions.findIndex((option)=> option.value === data.value)
            // console.log('=== === ===', indexedCrimeMethod)
            // setDefaultValue(indexedCrimeMethod)
            // if (
            //   value.includes("All") &&
            //   !(chartSelectedOptions as any)['crimes'].includes("All")
            // ) {
            //   setChartSelectedOptions((current) => ({
            //     ...current,
            //     ['crimes']: ["All"],
            //   }))
            // } else {
            //   setChartSelectedOptions((current) => ({
            //     ...current,
            //     ['crimes']: value.filter((v:any) => v !== "All"),
            //   }));
            // }
          }}
          /> */}
          <InputTypePicker
          
            name={name}
            placeholder={"Type of " + label}
            type="selectMany"
            checkedChartBox={(chartSelectedOptions as any)[name]}
            // checked={(chartSelectedOptions as any)[name].includes('type')}
            value={(chartSelectedOptions as any)[name]}
            onChange={(name = "", value = [""]) => {
                console.log('=== changed ===', value)
                setChartSelectedOptions((current) => ({
                  ...current,
                  [name]: value
                }));
              
            }}
            options={[
              ...options.map((option = "") => ({
                value: option,
                label: option,
              })),
            ]}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <AreaChart data={data} />
        </GridItem>
      </SimpleGrid>
    </Fragment>
  );

  const tabs = [
    {
      title: "Crime Statistics",
      body: (
        <ChartCard
          title="Crime Statistics"
          name="crimes"
          label="Crimes"
          data={stats.crimes}
          options={[
            "Criminal damage and arson",
            "Drugs",
            "Other crime",
            "theft",
            "Possession of weapons",
            "Public order",
            "Robbery",
            "Vehicle crime",
            "Violence and sexual offences",
          ]}
        />
      ),
    },
    {
      title: "Fire Incidents",
      body: (
        <ChartCard
          title="Fire Incidents"
          name="fires"
          label="Fire Incidents"
          data={stats.fires}
          options={[
            "Chimney fire",
            "Secondary Fire - accidental",
            "Secondary Fire - deliberate",
            "Primary fire - buildings"
          ]}
        />
      ),
    },
  ];

  return <CardComp body={<TabsComp tabs={tabs} />} />;
};

export default ResultsChartsBox;
