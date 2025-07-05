import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: Root,
})


function Navbar() {
  return (
    <div className="p-2 flex gap-2 text-white">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
    </div>

  )
}
function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}