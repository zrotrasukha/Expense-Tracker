import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute('/expenses')({
  component: Expenses,
  loader: getTotalSpent
})

async function getTotalSpent() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table className="bg-zinc-800 rounded-xl ">
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow className="transition-colors hover:bg-zinc-700 cursor-pointer hover:rounded-xl">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ?
            Array(3).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <Skeleton className="bg-zinc-900 h-4" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="bg-zinc-900 h-4" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="bg-zinc-900 h-4" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="bg-zinc-900 h-4" />
                </TableCell>
              </TableRow>
            )) : (
              data?.expense.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="transition-colors hover:bg-zinc-700 cursor-pointer"
                >
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
        <TableFooter>
          <TableRow className="transition-colors hover:bg-zinc-700 cursor-pointer">
            <TableCell colSpan={3} className="font-semibold">{
              isPending ? <Skeleton className="bg-zinc-900 h-4" /> : "Total"
            }</TableCell>
            <TableCell className="text-right font-semibold">
              ${isPending ? <Skeleton className="bg-zinc-900 h-4" /> : data?.expense.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2) || "0.00"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}