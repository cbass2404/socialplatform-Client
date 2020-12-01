import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import themeFile from "./util/theme";

import { Provider } from "react-redux";
import store from "./redux/store";

import "../styles/app.css";
import Home from "./pages/home";
import Navbar from "./nav/Navbar";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "https://us-central1-tentime-99a3b.cloudfunctions.net/api";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
