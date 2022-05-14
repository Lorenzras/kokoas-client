import { Route, Routes } from 'react-router-dom';
import { FormikConstruction } from './construction';
import {  FormikIndividualCustomer } from './customer/register/FormikIndividualCustomer';
import { FormikCustomerSearch } from './customer/search';
import { FormikProjProspect } from './projProspect';
import UnderConstruction from './UnderConstruction';



// The Main component renders one of the provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// RouteMatch, useParams : TS access to dynamic route

export const pages = {
  custGroupReg: '/custgroup/register',
  custGroupEdit: '/custgroup/edit/',

  projEdit: '/construction/edit/',
  projReg: '/construction/register',

  projProspect: '/prospect',
  custSearch: '/customer/search',
};



const Router = () => (
  

  <Routes>
    <Route path="/" element={<UnderConstruction />} />

    {/* 顧客グループ */}
    <Route path={`${pages.custGroupEdit}:recordId/`} element={<FormikIndividualCustomer />} />
    <Route path={pages.custGroupReg} element={<FormikIndividualCustomer key={'register'} />} />
    <Route path={pages.custSearch} element={<FormikCustomerSearch />} />

    {/* 工事情報 */}
    <Route path={pages.projReg} element={<FormikConstruction />} key={'regConst'}/>
    <Route path={`${pages.projEdit}:recordId/`} element={<FormikConstruction />} key={'edit'}/>

    {/* 見込み登録 */}
    <Route path={`${pages.projProspect}`} element={<FormikProjProspect />} key={'edit'}/>

  </Routes>

);

export default Router;
