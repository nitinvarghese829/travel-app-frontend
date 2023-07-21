import './App.css'
import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import IndexPage from "./pages/client/IndexPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import CreatePackage from "./pages/dashboard/packages/CreatePackage.jsx";
import ListPackages from "./pages/dashboard/packages/ListPackages.jsx";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate.jsx";
import CategoryList from "./pages/dashboard/category/CategoryList.jsx";
import DestinationCreate from "./pages/dashboard/destinations/DestinationCreate.jsx";
import DestinationList from "./pages/dashboard/destinations/DestinationList.jsx";
import {BASE_URL} from "./services/helper.jsx";

axios.defaults.baseURL  = `${BASE_URL}`;
axios.defaults.withCredentials = true;
function App() {

  return (
      <UserContextProvider>
          <Routes>
              <Route path={'/'} element={<Layout />}>
                  <Route index element={<LoginPage />} />
                  <Route path={'/login'} element={<LoginPage />} />
                  <Route path={'/register'} element={<RegisterPage />} />
                  <Route path={'/dashboard'} element={<Dashboard />} />

                  <Route path={'/dashboard/domestic/create'} element={<CreatePackage />} />
                  <Route path={'/dashboard/domestic/list'} element={<ListPackages />} />
                  <Route path={'/dashboard/list'} element={<ListPackages />} />

                  <Route path={'/dashboard/international/create'} element={<CreatePackage />} />
                  <Route path={'/dashboard/international/list'} element={<ListPackages />} />

                  <Route path={'/dashboard/:packageType/edit/:id'} element={<CreatePackage />} />

                  <Route path={'/dashboard/categories/create'} element={<CategoryCreate />} />
                  <Route path={'/dashboard/categories/list'} element={<CategoryList />} />

                  <Route path={'/dashboard/destinations/create'} element={<DestinationCreate />} />
                  <Route path={'/dashboard/destinations/list'} element={<DestinationList />} />
              </Route>
          </Routes>
      </UserContextProvider>

  )
}

export default App
