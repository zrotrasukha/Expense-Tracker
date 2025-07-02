import { z } from 'zod/v4';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

const createPostSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1).max(100),
    amount: z.number().int().min(0, ).positive(),
});

type Expense = z.infer<typeof createPostSchema>;

const fakeExpense: Expense[] = [
    {
        id: 1,
        title: "Lunch",
        amount: 15,
    },
    {
        id: 2,
        title: "Groceries",
        amount: 50,
    },
    {
        id: 3,
        title: "Utilities",
        amount: 100,
    },
];

export const expenseRouter = new Hono()
    .get("/" , async (c) => {
        return c.json({ expense: fakeExpense });
        })
        .get("/total", async (c) => {
        const total = fakeExpense.reduce((sum, exp) => sum + exp.amount, 0);
        return c.json({ total });
    })
    .post("/", zValidator("json", createPostSchema), async (c) => {
        const newExpense = c.req.valid("json") as Expense;
        fakeExpense.push(newExpense);
        return c.json({ message: "Expense added successfully", expense: newExpense }, 201);
    })
    .get("/:id{[0-9]+}", async (c) => {
        const id = c.req.param("id");
        const expense = fakeExpense.find(exp => exp.id === parseInt(id));
        if (expense) {
            return c.json({ expense });
        } else {
            return c.json({ message: "Expense not found" }, 404);
        }
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = c.req.param("id");
        const index = fakeExpense.findIndex(exp => exp.id === parseInt(id));
        if (index !== -1) {
            fakeExpense.splice(index, 1);
            return c.json({ message: "Expense deleted successfully" });
        } else {
            return c.json({ message: "Expense not found" }, 404);
        }
    })

