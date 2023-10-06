import React from "react";
import { Routes, Route } from "react-router-dom";


export default function PageRoutes() {
  const Home = React.lazy(() => import("../components/home"));
  const Form = React.lazy(() => import('../components/Forms/index'));
  const ErpDbCompany = React.lazy(() => import('../components/ErpDbCompany'));

  const Loading = () => <p>Loading ...</p>;
  return (
    <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/form' element={<Form />} />
          <Route path='/erp-db-company' element={<ErpDbCompany />} />
        </Routes>
    </React.Suspense>
  );
}
