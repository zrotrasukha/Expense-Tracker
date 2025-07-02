import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card.tsx"

type TotalSpendProps = {
    amount: number
    currency?: string
}

export function TotalSpend({ amount, currency = "₹" }: TotalSpendProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Spend</CardTitle>
                <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
                <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {currency}{amount.toLocaleString()}
                </span>
            </CardContent>
        </Card>
    )
}
