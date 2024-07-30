// import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";

import { locationProps } from ".";
import CardComp from "../../../components/cards";
import FormRenderer from "../../../components/forms/FormRenderer";
import GoogleMapComp from "../../../components/googleMap";
// import { title } from "process";
// import { GridItem, SimpleGrid } from "@chakra-ui/react";

interface props {
  withoutMap?: boolean;
  data?: locationProps[];
  setProperty?: any;
  onSubmit?: any;
  coordinates?: number[];
}

const  ResultsSearchBox = ({
  withoutMap,
  data,
  setProperty,
  onSubmit,
  coordinates
}: props) => {
  const inputs = [
    // {
    //   name: "All",
    //   title: "all",
    //   type: "checkbox",
    //   checked: false,
    //   fullWidth: true,
    // },
    // {
    //   name: "transporation",
    //   placeholder: "Transport Stations",
    //   type: "selectMany",
    //   options: [{ value: "stops", label: "Stops" }],
    //   fullWidth: true,
    // },
    // {
    //   name: "police",
    //   placeholder: "Police Stations",
    //   type: "selectMany",
    //   options: [{ value: "police_stations", label: "Police Stations" }],
    //   fullWidth: true,
    // },
    // {
    //   name: "education",
    //   placeholder: "Education",
    //   type: "selectMany",
    //   options: [{ value: "schools", label: "Schools" }],
    //   fullWidth: true,
    // },
    {
      name: "stops",
      title: "Transport Stations",
      type: "checkbox",
      checked: true,

      fullWidth: true,
    },
    {
      name: "police_stations",
      title: "Police Stations",
      type: "checkbox",
      checked: true,

      fullWidth: true,
    },
    {
      name: "schools",
      title: "Education",
      type: "checkbox",
      checked: true,

      fullWidth: true,
    },
    {
      name: "medical_services",
      // placeholder: "Medical Center",
      type: "checkbox",
      title: "Medical Center",
      checked: true,
      // options: [
      //   { value: "clinics", label: "Clinics" },
      //   { value: "pharmacies", label: "Pharmacies" },
      //   { value: "hospitals", label: "Hospitals" },
      //   { value: "gp_practices", label: "GP Practices" },
      //   { value: "scls", label: "Supported Cate Living" },
      //   { value: "dentists", label: "Dentists" },
      // ],
      fullWidth: true,
    },
    // {
    //   name: "fireStations",
    //   placeholder: "Fire Stations",
    //   type: "selectMany",
    //   options: [{ value: "fire_stations", label: "Fire Stations" }],
    //   fullWidth: true,
    // },
    {
      name: "fire_stations",
      title: "Fire Stations",
      type: "checkbox",
      checked: true,

      fullWidth: true,
    },
    {
      name: "floods",
      title: "Flood Risk",
      type: "checkbox",
      checked: false,

      fullWidth: true,
    },
    {
      name: "fire_incidents",
      title: "Fire Incidents",
      type: "checkbox",
      checked: true,

      fullWidth: true,
    },
  ];
  return (
    <CardComp
      title="Select services"
      body={
        <Fragment>
          {!withoutMap && data?.length ? <>
            <FormRenderer
                
                map={true}
                inputs={inputs}
                onSubmit={(e: object) => onSubmit(e)}
              />
              <br />
              <br />
                <GoogleMapComp coordinates={coordinates} data={data} setProperty={setProperty} />
               
              
           </> : (
            <FormRenderer 
              map={true}

              inputs={inputs}
              onSubmit={(e: object) => onSubmit(e)}
            />
          )} 
        </Fragment>
      }
    />
  );
};

export default ResultsSearchBox;
