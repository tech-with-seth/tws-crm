import { getAllCustomers } from "~/models/customer.server";
import type { Route } from "./+types/customers";
import { Link, Outlet } from "react-router";
import { Card, CardContent } from "~/components/ui/card";

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
        <div className="min-w-[420px] space-y-4">
          {customers.map((customer) => (
            <Link className="block" key={customer.id} to={customer.email}>
              {customer.email}
            </Link>
          ))}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
