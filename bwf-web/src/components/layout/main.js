import { Routes, Route} from 'react-router-dom';
import GroupList from '../group/group-list';
import GroupDetails from '../group/group-details';
import { useAuth } from '../../hooks/useAuth';
import Register from '../user/register';
import Account from '../user/account';


function Main() {

  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<GroupList />}></ Route>
        <Route exact path="/details/:id" element={<GroupDetails />}></ Route>
        <Route exact path="/register" element={<Register />}></ Route>
        <Route exact path="/account" element={<Account />}></ Route>
      </Routes>
      
    </div>
  )
}

export default Main;