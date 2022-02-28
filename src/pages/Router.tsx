import { Route, Routes } from 'react-router-dom';
import ConstructionRegister from './construction/register';
import CustomerRegistration from './customer/register/CustomerRegistration';
import UnderConstruction from './UnderConstruction';



// The Main component renders one of the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// RouteMatch, useParams : TS access to dynamic route



const Router = () => (

  <Routes>
    <Route path="/" element={<UnderConstruction />} />
    <Route path="/construction/register" element={<ConstructionRegister/>} />
    <Route path="/customer/register" element={<CustomerRegistration key={'register'} />} />
    <Route path="/custgroup/:groupId/edit" element={<CustomerRegistration />} />
  </Routes>

);

export default Router;
