import ExpenseTrackerCard from "@components/ExpenseTrackerCard"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

async function getTotalSpent(){
  const res = await api.expenses.total.$get();
  if(!res.ok){
    throw new Error("server error");
  }
  const data = await res.json();
  return data; 
}

function App() {
  const {data, isPending, error} = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent
  })
  return(
    <div className="flex justify-center items-center h-screen w-screen bg-zinc-900">
      <ExpenseTrackerCard totalSpent={data?.total} error={error} isPending={isPending} />
    </div>
  )
}

export default App
