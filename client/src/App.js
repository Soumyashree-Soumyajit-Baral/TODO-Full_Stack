import { BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Todo from "./components/todo/todo";
import Logout from "./components/logout/logout";
import Protective from "./components/protective/protective";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/" exact element={<Login/>}></Route>
          <Route element={<Protective/>}>
          <Route path="/todo"  element={<Todo/>}></Route>
          </Route>
          
          <Route path="/logout"  element={<Logout/>}></Route>

        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
