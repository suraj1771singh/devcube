import AllRoutes from './route/AllRoutes'
import { useSelector } from 'react-redux';
import { rootReducertype } from './Redux/Store';

function App() {
  let {drk_theme} = useSelector((val:rootReducertype)=>val.theme)
  return (
    <>
    <div className={`min-h-[100vh] ${drk_theme?"bg-bg_dark_pri text-font_dark_pri":"bg-bg_light_pri text-font_light_pri "}`}>
      <AllRoutes/>
    </div>
    </>
  );
}

export default App;
