import Route from "./route/index";
import ComponentNaavigation from "./components/Navigation/ComponentNavigation.js";
import "../node_modules/antd/dist/antd.css";
import "../node_modules/antd/dist/antd.less";


function App() {
  return (
    <div>
      <ComponentNaavigation />
      <Route />
    </div>
  );
}

export default App;
