import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import ExpenseCreate from "./pages/expense";
import BudgetCreate from "./pages/budget";
import Home from "./pages/home";
import TrackCategory from "./pages/track-category";
import  GenerateReport  from "./pages/generate-report";
function App() {
  return (
    <Routes>
      <Route element={<Basic />}>
      <Route path="/" element={<Home />} />
        <Route path="/create-expense" element={<ExpenseCreate />} />
        <Route path="/create-budget" element={<BudgetCreate />} />
        <Route path="/track-category" element={<TrackCategory />} />
        <Route path="/generate-report" element={<GenerateReport />} />

      </Route>
    </Routes>
  );
}

export default App;
