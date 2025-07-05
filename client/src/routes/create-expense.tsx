import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import FieldInfo from '@/lib/fieldInfo';
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
export const Route = createFileRoute('/create-expense')({
  component: Create,
})

function Create() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const res = await api.expenses.create.$post({
        json:
        {
          id: Date.now(),
          ...value,
        }
      })
      if (!res.ok) {
        throw new Error('Failed to create expense');
      }
      navigate({ to: '/expenses' });
      console.log(value)
    },
  });

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }} className='flex flex-col gap-4 w-96 bg-zinc-700 p-6 rounded-lg shadow-md'>
        <div>
          <form.Field
            name="title"
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Title</label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const normalized = e.target.value.replace(/^0+(?=\d)/, '');
                      field.handleChange(normalized);
                    }}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="amount"
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Amount</label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='number'
                    onChange={(e) => field.handleChange(+e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                className='w-full bg-white text-zinc-700 hover:bg-gray-200 uppercase font-bold'
                type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
        </div>
      </form > </div>
  )
}
