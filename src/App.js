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
        <h1 className="h2 pt-2 pb-3 heading">Personal Scheduler</h1>

        <Tabs />
      </div>
    </div>
  );
}

export default App;
