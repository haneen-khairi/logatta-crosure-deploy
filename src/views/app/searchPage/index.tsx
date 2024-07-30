import { Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as SearchAPI from "../../../api/search";
import SearchBar from "../../../components/searchBar";
import SearchEngineLayout from "../../../layouts/searchEngine";
import { setPostcode } from "../../../redux/actions/data";
// import { borderRound } from "../../../utils/consts";

const SearchPage = () => {
  const dispatch = useDispatch();

  const [previousSearches, setPreviousSearches] = useState({});

  const onSubmit = (value = "") => {
    dispatch(setPostcode(value));
  };

  useEffect(() => {
    SearchAPI.searchHistory().then((res: object) => {
      console.log('=== res ===',  res)
      setPreviousSearches(res);
    });
  }, []);

  return (
    <SearchEngineLayout>
      <SearchBar className="" onSubmit={(value = "") => onSubmit(value)} />

      <SimpleGrid columns={{ base: 5, md: 5 }} gap={'12px'} mt={'24px'}>
        {Object.keys(previousSearches)
          .map((key) => ({ postcode: key, ...(previousSearches as any)[key] }))
          ?.map(({ postcode }, i) => (
            <Button
              onClick={() => onSubmit(postcode)}
              // bgColor="primary.100"
              // borderWidth={1}
              // borderColor="primary.500"
              // py="7"
              // ms={i === 0 ? 0 : 4}
              // me={i === 4 ? 0 : 4}
              // borderRadius={borderRound}
              // px={0}
              key={i}
              className="button_tags"
            >
              {postcode}
            </Button>
          ))}
      </SimpleGrid>
    </SearchEngineLayout>
  );
};

export default SearchPage;
