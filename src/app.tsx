// import { RouterProvider } from "react-router-dom";
import ResultsPage from "./views/app/resultsPage";
import SearchPage from "./views/app/searchPage";
import LoginPage from "./views/auth/login";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((_: { auth: { token: string } }) => _.auth);
  const { postcode } = useSelector(
    (_: { data: { postcode: string } }) => _.data
  );

  return token ? postcode ? <ResultsPage /> : <SearchPage /> : <LoginPage />;
};

export default App;
