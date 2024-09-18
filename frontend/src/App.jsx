import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateFact from "./pages/CreateFact";
import ShowFact from './pages/ShowFact';
import EditFact from "./pages/EditFact";
import DeleteFact from "./pages/DeleteFact";


const App = () => {

  return(
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/facts/create' element={<CreateFact />}></Route>
      <Route path='/facts/details/:id' element={<ShowFact />}></Route>
      <Route path='/facts/edit/:id' element={<EditFact />}></Route>
      <Route path='/facts/delete/:id' element={<DeleteFact />}></Route>
    </Routes> 
  )
}

export default App;