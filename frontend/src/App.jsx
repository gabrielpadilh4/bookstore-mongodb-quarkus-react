import {Routes, Route} from 'react-router-dom'

import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
import NoPermission from "./pages/NoPermission"

export default function App({keycloak}) {

  console.log(keycloak.hasRealmRole('admin'));

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={keycloak.hasRealmRole('admin') && !!keycloak.token ? <CreateBook /> : <NoPermission/>}/>
      <Route path='/books/details/:id' element={<ShowBook />}/>
      <Route path='/books/edit/:id' element={<EditBook />}/>
      <Route path='/books/delete/:id' element={<DeleteBook />}/>
    </Routes>
  )
}