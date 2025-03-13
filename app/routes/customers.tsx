import { getAllCustomers } from "~/models/customer.server";
import type { Route } from "./+types/customers";
import { NavLink, Outlet } from "react-router";

export async function loader() {
  return {
    customers: await getAllCustomers(),
  };
}

export default function CustomersRoute({ loaderData }: Route.ComponentProps) {
  const { customers } = loaderData;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Customers</h1>
      <div className="flex gap-4">
        <div className="min-w-[420px] space-y-2">
          {customers.map((customer) => (
            <NavLink
              key={customer.id}
              to={customer.email}
              className={({ isActive }) =>
                `block ${isActive ? "bg-zinc-700" : ""} rounded-md p-2`
              }
            >
              {customer.email}
            </NavLink>
          ))}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
