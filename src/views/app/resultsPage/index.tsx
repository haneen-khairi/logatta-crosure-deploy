import {
  GridItem,
  SimpleGrid
} from "@chakra-ui/react";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faFireExtinguisher } from "@fortawesome/free-solid-svg-icons/faFireExtinguisher";
import { faHandcuffs } from "@fortawesome/free-solid-svg-icons/faHandcuffs";
import { faHospital } from "@fortawesome/free-solid-svg-icons/faHospital";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faHouseFloodWater } from "@fortawesome/free-solid-svg-icons/faHouseFloodWater";
import { faPersonCane } from "@fortawesome/free-solid-svg-icons/faPersonCane";
import { faSchool } from "@fortawesome/free-solid-svg-icons/faSchool";
import { faSyringe } from "@fortawesome/free-solid-svg-icons/faSyringe";
import { faTooth } from "@fortawesome/free-solid-svg-icons/faTooth";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons/faUserDoctor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as PropertyAPI from "../../../api/property";
import * as SearchAPI from "../../../api/search";
import ResultsLayout from "../../../layouts/results";
import ResultsChartsBox from "./ChartsBox";
import ResultsDetailsBox from "./DetailsBox";
import MapPicturesBox from "./MapPicturesBox";
import ResultsSearchBox from "./SearchBox";
import ResultsSummaryBox from "./SummaryBox";
// import ShowMoreButton from "../../../components/buttons/ShowMore";
import TableComponent from "../../../components/TableComponent";
// import axios from "axios";

export interface locationProps {
  id: number;
  lat: string;
  lng: string;
  type?: string;
}

export interface summaryProps {
  id?: number;
  avg_living_costs: number;
  avg_price: number;
  avg_living_costs_with_currency?: string;
  price_with_currency?: string;
}

export interface detailsProps {
  id: number;
  avg_living_costs_with_currency: string;
  price_with_currency: string;
  lat: string;
  lng: string;
  property_type: string;
  // coordinates: any;
  bedrooms: number;
  bathrooms: number;
  condition: string;
  storage: boolean;
  gardens: number;
  pictures: string[];
}

interface resProps {
  properties_summary: summaryProps;
  coordinates: [];
  clinics: { results: locationProps[] };
  dentists: { results: locationProps[] };
  fire_incidents: { results: locationProps[] };
  fire_stations: { results: locationProps[] };
  floods: { results: locationProps[] };
  gp_practices: { results: locationProps[] };
  hospitals: { results: locationProps[] };
  properties: { results: locationProps[] };
  pharmacies: { results: locationProps[] };
  police_stations: { results: locationProps[] };
  schools: { results: locationProps[] };
  scls: { results: locationProps[] };
  stops: { results: locationProps[] };
}

export const locationTypes = [
  { name: "clinic", icon: faHouseMedical, color: "blue" },
  { name: "dentist", icon: faTooth, color: "blue" },
  { name: "fire_incident", icon: faFire, color: "red" },
  { name: "fire_station", icon: faFireExtinguisher, color: "orange" },
  { name: "flood", icon: faHouseFloodWater, color: "red" },
  { name: "gp_practice", icon: faUserDoctor, color: "blue" },
  { name: "hospital", icon: faHospital, color: "blue" },
  { name: "property", icon: faHouse },
  { name: "pharmacy", icon: faSyringe, color: "blue" },
  { name: "police_station", icon: faHandcuffs, color: "orange" },
  { name: "school", icon: faSchool },
  { name: "scl", icon: faPersonCane, color: "blue" },
  { name: "stop", icon: faBus },
];

interface searchProps {
  places?: string[];
}

const ResultsPage = () => {
  const { postcode } = useSelector(
    (_: { data: { postcode: string } }) => _.data
  );
  // const [placesResponse , setPlacesResponse] = useState<any>({})
  const [coordinates, setCoordinates] = useState([]);
  const [locations, setLocations] = useState([
    { id: 0, lat: "", lng: "", type: "" },
  ]);
  const [showDetails, setShowDetails] = useState(0);

  const [collectivePropertiesSummary, setCollectivePropertiesSummary] =
    useState<summaryProps>({
      avg_living_costs: 0,
      avg_price: 0,
    });

  const [propertiesSummary, setPropertiesSummary] = useState<summaryProps>({
    avg_living_costs: 0,
    avg_price: 0,
  });

  const initalPropertyDetails = {
    id: 0,
    price_with_currency: "",
    avg_living_costs_with_currency: "",
    lat: "",
    lng: "",
    property_type: "",
    bedrooms: 0,
    bathrooms: 0,
    condition: "",
    storage: false,
    gardens: 0,
    pictures: [],
  };

  const [propertyDetails, setPropertyDetails] = useState<detailsProps>(
    initalPropertyDetails
  );

  const getData = ({ places }: searchProps) => {
    // console.log("=== places ===", places);
    // @ts-ignore
    SearchAPI.search(postcode, places).then((res: resProps) => {
      // console.log("=== search init ===", res);
      // setPlacesResponse(res)
      setCoordinates(res.coordinates);
      // const newData = Object.keys(res).map((key) => ({
      //   type: key,
      //   ...res[key],
      // }));

      const clinics =
        res?.clinics?.results?.map((loc) => ({
          ...loc,
          type: "clinic",
        })) || [];

      const dentists =
        res?.dentists?.results?.map((loc) => ({
          ...loc,
          type: "dentist",
        })) || [];

      const fire_incidents =
        res?.fire_incidents?.results?.map((loc) => ({
          ...loc,
          type: "fire_incident",
        })) || [];

      const fire_stations =
        res?.fire_stations?.results?.map((loc) => ({
          ...loc,
          type: "fire_station",
        })) || [];

      const floods =
        res?.floods?.results?.map((loc) => ({
          ...loc,
          type: "flood",
        })) || [];

      const gp_practices =
        res?.gp_practices?.results?.map((loc) => ({
          ...loc,
          type: "gp_practice",
        })) || [];

      const hospitals =
        res?.hospitals?.results?.map((loc) => ({
          ...loc,
          type: "hospital",
        })) || [];

      const properties =
        res?.properties?.results?.map((loc) => ({
          ...loc,
          type: "property",
        })) || [];

      const pharmacies =
        res?.pharmacies?.results?.map((loc) => ({
          ...loc,
          type: "pharmacy",
        })) || [];

      const police_stations =
        res?.police_stations?.results?.map((loc) => ({
          ...loc,
          type: "police_station",
        })) || [];

      const schools =
        res?.schools?.results?.map((loc) => ({
          ...loc,
          type: "school",
        })) || [];

      const scls =
        res?.scls?.results?.map((loc) => ({
          ...loc,
          type: "scl",
        })) || [];

      const stops =
        res?.stops?.results?.map((loc) => ({
          ...loc,
          type: "stop",
        })) || [];

      setLocations([
        ...clinics,
        ...dentists,
        ...fire_incidents,
        ...fire_stations,
        ...floods,
        ...gp_practices,
        ...hospitals,
        ...properties,
        ...pharmacies,
        ...police_stations,
        ...schools,
        ...scls,
        ...stops,
      ]);
      
      setPropertiesSummary(res.properties_summary);
      setCollectivePropertiesSummary(res.properties_summary);
    });
  };

  useEffect(() => {
    getData({
      places: [
        "stops",
        "fire_incidents",
        "schools",
        "medical_services",
        "police_stations",
        "stops",
        "fire_stations",
      ],
    });
  }, [postcode]);

  useEffect(() => {
    if (showDetails) {
      // @ts-ignore
      PropertyAPI.details(showDetails).then((res: detailsProps) => {
        setPropertyDetails(res);
      });
    }
  }, [showDetails]);

  const resetProperty = () => {
    setPropertyDetails(initalPropertyDetails);
    setShowDetails(0);
    setPropertiesSummary(collectivePropertiesSummary);
  };

  const onSearchSubmit = (places: searchProps) => {
    const placesArray = Object.keys(places).reduce(
      (final: string[], key: string) =>
        key === "fire_incidents" ||
        key === "floods" ||
        key === "schools" ||
        key === "medical_services" ||
        key === "police_stations" ||
        key === "stops" ||
        key === "fire_stations"
          ? (places as any)[key]
            ? [...final, key]
            : final
          : [...final, ...(places as any)[key]],
      []
    );

    getData({ places: placesArray });
  };
  // async function download() {
  //   console.log("=== download ===", placesResponse);
  //   SearchAPI.Download(placesResponse).then((res) => {
  //     console.log('=== download ===', res)
  //   }).catch((error) => {
  //     console.log('=== error ===', error)
  //   })
  // }
  return (
    <ResultsLayout>
      {showDetails ? (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={7}>
          <GridItem colSpan={2}>
            <ResultsSearchBox onSubmit={onSearchSubmit} />
          </GridItem>

          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <MapPicturesBox data={propertyDetails} />
          </GridItem>

          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <ResultsDetailsBox
              data={propertyDetails}
              reset={() => resetProperty()}
            />
          </GridItem>
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={7}>
          <GridItem colSpan={2}>
            <ResultsSearchBox
              coordinates={coordinates}
              data={locations}
              setProperty={setPropertiesSummary}
              onSubmit={onSearchSubmit}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <SimpleGrid columns={{ base: 1, lg: 1 }} gap={10}>
              <TableComponent
                data={locations?.filter(
                  (location) => location?.type === "property"
                )}
                setShowDetails={setShowDetails}
                headers={[
                  {
                    key: "id",
                    name: "#",
                  },
                  {
                    key: "price_with_currency",
                    name: "Price Range",
                  },
                  {
                    key: "avg_living_costs_with_currency",
                    name: "Average Living Costs",
                  },
                ]}
                tableName={"Properties"}
              />
              <TableComponent
                data={locations?.filter(
                  (location) => location?.type === "stop"
                )}
                setShowDetails={setShowDetails}
                tableName={"Transportaion stations"}
                headers={[
                  {
                    key: "atco_code",
                    name: "#",
                  },
                  {
                    key: "common_name",
                    name: "Common name",
                  },
                  {
                    key: "stop_type",
                    name: "Type",
                  },
                ]}
              />

              <TableComponent
                data={locations?.filter(
                  (location) => location?.type === "fire_incident"
                )}
                setShowDetails={setShowDetails}
                tableName={"Fire Incidents"}
                headers={[
                  {
                    key: "id",
                    name: "#",
                  },
                  {
                    key: "incident_type",
                    name: "Type",
                  },
                  {
                    key: "lsoa_description",
                    name: "Description",
                  },
                  {
                    key: "lsoa_code",
                    name: "Lsoa code",
                  },
                  {
                    key: "territory",
                    name: "Territory",
                  },
                  {
                    key: "year",
                    name: "Year",
                  },
                ]}
              />
              {/* <Button
                w="100%"
                colorScheme="primary"
                type="submit"
                py="7"
                onClick={download}
              >
                Download
              </Button> */}
            </SimpleGrid>
          </GridItem>
          <GridItem className="order2" colSpan={{ base: 2, lg: 1 }}>
            <ResultsChartsBox />
          </GridItem>

          <GridItem className="order1" colSpan={{ base: 2, lg: 1 }}>
            <ResultsSummaryBox
              data={propertiesSummary}
              setShowDetails={setShowDetails}
            />
          </GridItem>
        </SimpleGrid>
      )}
    </ResultsLayout>
  );
};

export default ResultsPage;
