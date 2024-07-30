import { IconButton } from "@chakra-ui/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GoogleMap,
  HeatmapLayer,
  InfoWindow,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";

import { borderHalfRound } from "../../utils/consts";
import { locationProps, locationTypes } from "../../views/app/resultsPage";
import { googleMapKey } from "../../api/search";

const containerStyle = {
  width: "100%",
  height: "65vh",
  margin: "0",
  borderRadius: borderHalfRound,
};

interface props {
  data?: locationProps[];
  setProperty?: any;
  coordinates?: number[];
}

const GoogleMapComp = React.memo(
  ({ data, setProperty, coordinates }: props) => {
    // const { colorMode } = useColorMode()

    // console.log("=== google map ===", data, setProperty, coordinates);
    const [activePopupId, setActivePopupId] = useState(null);
    const [activePopupCordinates, setActivePopupCordinates] = useState({
      lat: 0,
      lng: 0
    });


    // console.log('=== coordinates google map ===', coordinates)
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: googleMapKey,
      libraries: ["visualization"],
    });

    const center = {
      lat: 51.499075,
      lng: -0.124742,
    };

    const [mapp, setMap] = React.useState(null);
    console.log("=== maps ===", mapp);
    function getSelectedData(prop:any , type: any){
      setActivePopupCordinates({
        lat: 0,
        lng: 0
      })
      console.log("=== getSelectedData ===", prop)
      setActivePopupId(prop.id);
      setTimeout(() => {
        setActivePopupCordinates({lat: parseFloat(prop.lat) , lng: parseFloat(prop.lng)})
        console.log('=== getSelectedData ===', {lat: prop.lat , lng: prop.lng})
      }, 1000);
      if(type === "property"){
        setProperty(prop)
      }else{
        console.log("Not a property, no summary to show")
      }
    }
    const onLoad = React.useCallback(
      (map: any) => {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);

        // console.log('<=== bounds ===>', bounds);
        // console.log('<=== mapsss ===>',{ mapp });
      },
      [data]
    );
    function getDataClassfied(array: any) {
      console.log("=== data ===", array);
      return array
        ?.map((item: any) => {
          if (item.type === "flood" && item.outer_ring_coords) {
            return item.outer_ring_coords.map((coords: any) => ({
              lat: coords[0],
              lng: coords[1],
            }));
          }
        })
        .filter((poly: any) => poly?.length > 0);
    }
    const points = getDataClassfied(data);
    // Create an array of LatLng objects from the points
    // const latLngArray = points.flat().map((point: any) => {
    //   return { lat: point.lat, lng: point.lng };
    // });
    // console.log("=== latLngArray ===", latLngArray);

    const onUnmount = React.useCallback(() => {
      setMap(null);
    }, [data]);
    const heatmapData = points
      .flat()
      .map((point: any) => new google.maps.LatLng(point.lat, point.lng));
    // console.log("=== heatmapData ===", heatmapData);

    return isLoaded && data?.length ? (
      <GoogleMap
      // options={
      //   (maps: any) => {
      //     console.log('=== e ===', maps)
      //   }
      // }
      mapTypeId="satellite"
        mapContainerStyle={containerStyle}
        center={{
          lat: coordinates?.[0] || parseFloat(data[0]?.lat),
          lng: coordinates?.[1] || parseFloat(data[0]?.lng),
        }}
        
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 20,
            opacity: 0.6,
          }}
        />
        {/* Render Polyline to connect the points */}
        {/* <Polyline
        path={latLngArray}
        options={{
          strokeColor: 'blue', // Customize the color of the line as needed
          strokeOpacity: 1.0,
          strokeWeight: 2, // Customize the width of the line as needed
        }}
      /> */}
        {data?.map((prop: any, i: any) => {
          const { lat, lng, type } = prop;
          const typ = locationTypes.find(({ name }) => name === type);
          // let positionForDataSelected;
          // setTimeout(() => {
          //   positionForDataSelected = {lat: prop.lat , lng: prop.lng}
          // }, 1000);
          const isValidPosition = typeof activePopupCordinates.lat === 'number' && typeof activePopupCordinates.lng === 'number';
          // console.log('=== lat and lng type ===', typeof activePopupCordinates.lat, typeof activePopupCordinates.lng , activePopupCordinates)
          return <>
          
             {/* {selectedPoint && (
                <Marker
                  position={{
                    lat: selectedPoint.lat,
                    lng: selectedPoint.lng,
                  }}
                  // onClick={() => setSelectedPoint(null)} // Close the InfoWindow when marker is clicked
                >
                  <InfoWindow>
                    <div>
                      <p>{selectedPoint.name}</p>
                      <p>{selectedPoint.description}</p>
                    </div>
                  </InfoWindow>
                </Marker>
              )} */}
                {/* {selectedData &&  } */}
                {isValidPosition && activePopupId === prop.id  && (
                  console.log('=== positionForDataSelected ===', activePopupCordinates),
                    activePopupCordinates.lat && activePopupCordinates.lng && (
                      <InfoWindow
                        position={activePopupCordinates}
                        onCloseClick={() => setActivePopupId(null)}
                      >
                        {/* <Text color={colorMode === 'light' ? '#040404' : '#fff'}> */}
                          <a  target="_blank" style={{color: 'blue'}} href={prop.url_link}>{prop.url_link}</a>
                        {/* </Text> */}
                      </InfoWindow>
                    )
                )}
            <OverlayView
              position={{
                lat,
                lng,
              }}
              
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              key={i}
            >
              <IconButton
                className="icon__property"
                isRound
                variant="solid"
                colorScheme={typ?.color || "primary"}
                aria-label="Done"
                fontSize="15px"
                onClick={() =>
                  getSelectedData(prop, type)
                }
                icon={<FontAwesomeIcon icon={typ?.icon || faCheck} />}
              />
            </OverlayView>
          </>
            
          
        })}
      </GoogleMap>
    ) : (
      <></>
    );
  }
);

export default GoogleMapComp;
