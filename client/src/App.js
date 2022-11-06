import { BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Todo from "./components/todo/todo";
import Logout from "./components/logout/logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/" exact element={<Login/>}></Route>
          <Route path="/todo"  element={<Todo/>}></Route>
          <Route path="/logout"  element={<Logout/>}></Route>

        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
