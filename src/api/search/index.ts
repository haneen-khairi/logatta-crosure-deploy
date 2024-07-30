import api from "..";

const search = (postcode: string, places: string[]) =>
  api.post(`core/places/`, {
    postcode,
    places,
  });

const searchHistory = () =>
  api.post("core/postcodes/history/", {
    by: "search_date",
    count: 5,
  });
  const Download = (places: any) =>
  api.post(`core/places/download/`, places);
const googleMapKey = "AIzaSyAE-OzpZjuJkIeVxRJ2J9gGmrCgtYdftbk";
export { search, searchHistory , Download , googleMapKey};
