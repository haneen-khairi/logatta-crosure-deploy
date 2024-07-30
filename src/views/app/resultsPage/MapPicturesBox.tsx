import {
  Flex,
  GridItem,
  Image,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";

import { detailsProps } from ".";
// import ShowMoreButton from "../../../components/buttons/ShowMore";
import CardComp from "../../../components/cards";
import GoogleMapComp from "../../../components/googleMap";
import BoxTitle from "../../../components/typography/BoxTitle";

interface props {
  data: detailsProps;
}

const MapPicturesBox = ({ data }: props) => {
  const [gallery, setGallery] = useState(-1);

  return (
    <Fragment>
      <CardComp
        body={
          <Fragment>
            <GoogleMapComp
              data={[{ id: data.id, lat: data.lat, lng: data.lng }]}
            />

            <Flex justifyContent="space-between" gap={'16px'} marginTop={'16px'}>
              <BoxTitle title="Property Pictures" />

              {/* <ShowMoreButton onClick={() => setGallery(0)} /> */}
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} my={4}>
              {data.pictures?.map((img, i) => (
                <GridItem key={i}>
                  <Image
                    src={img}
                    width="100%"
                    style={{
                      borderRadius: '16px',
                      height: '100px'
                    }}  
                    onClick={() => setGallery(i)}
                    role="button"
                  />
                </GridItem>
              ))}
            </SimpleGrid>
          </Fragment>
        }
      />

      <Modal isOpen={gallery >= 0} onClose={() => setGallery(-1)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <SimpleGrid columns={4}>
              <GridItem colSpan={4} textAlign="center">
                <Img
                  src={data.pictures[gallery]}
                  style={{ maxHeight: "70vh", maxWidth: "100%" }}
                />
              </GridItem>

              {/* {data.pictures
                ?.filter(
                  (_, i) => i !== gallery && i > gallery - 3 && i < gallery + 3
                )
                .map((img, i) => (
                  <GridItem key={i}>
                    <Img src={img} width="100%" />
                  </GridItem>
                ))} */}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default MapPicturesBox;
