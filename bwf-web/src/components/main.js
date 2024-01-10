import { Routes, Route} from 'react-router-dom';
import GroupList from './group-list';
import GroupDetails from './group-details';


function Main() {

  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<GroupList />}></ Route>
        <Route exact path="/details/:id" element={<GroupDetails />}></ Route>
      </Routes>
      
    </div>
  )
}

export default Main;