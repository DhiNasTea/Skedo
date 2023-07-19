import Tabs from "./Tabs";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-green fixed-top">
        <div className="px-sm-3 container">
          <a href="#" className="navbar-brand">
            <span className="site-title">Skedo</span>
          </a>
        </div>
      </nav>
      <div className="body-container mt-5">
        <h3 className="h3 pt-2 pb-3">Personal Scheduler</h3>

        <Tabs />
      </div>
    </div>
  );
}

export default App;
