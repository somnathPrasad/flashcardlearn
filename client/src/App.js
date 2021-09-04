import "./App.css";
import Flashcard from "./components/Flashcard";
import CrossButton from "./components/CardButton";
import { TickButton, PlusButton } from "./components/CardButton";
import EmailInput from "./components/EmailInput";

function App() {
  return (
    <div className="App">
    <EmailInput />
      <div className="p-0" id="main" style={{display:"none"}}>
        <Flashcard />
        <div className="flex justify-between items-center w-full mx-auto my-5 p-3 fixed bottom-0">
          <CrossButton />
          <PlusButton />
          <TickButton />
        </div>
      </div>
    </div>
  );
}

export default App;
