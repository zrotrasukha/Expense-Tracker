import { useEffect, useState } from "react"
import ExpenseTrackerCard from "./components/ExpenseTrackerCard"

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    try {
      async function fetchTool() {
        const response = await fetch('/api/expenses/total');
        const data = await response.json();
        setTotalSpent(data.total);
        console.log('Total Expenses:', data.total);
      }
      fetchTool();
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-zinc-900">
      <ExpenseTrackerCard totalSpent={totalSpent} /></div>
  )
}

export default App
