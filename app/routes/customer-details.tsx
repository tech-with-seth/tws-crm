import { getCustomerByEmailWithInteractions } from "~/models/customer.server";
import type { Route } from "./+types/customer-details";
import { formatDate } from "~/utils/common";
import { useNavigation } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader({ params }: Route.LoaderArgs) {
  const customer = await getCustomerByEmailWithInteractions(
    params.customerEmail,
  );

  await sleep(300);

  return {
    customer,
  };
}

export default function CustomerDetailRoute({
  loaderData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-[500px]" />
        <Skeleton className="h-4 w-[320px]" />
        <Skeleton className="h-4 w-[320px]" />
        <Skeleton className="h-4 w-[320px]" />
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto">
      {loaderData.customer?.interactions.map((interaction) => (
        <>
          <p>Created by: {interaction.author.email}</p>
          <p>Type: {interaction.type}</p>
          <p className="space-y-4">
            {interaction.comments.map((comment) => (
              <ul
                key={comment.id}
                className="flex flex-col gap-2 rounded-md border p-4"
              >
                <li>{formatDate(comment.createdAt)}</li>
                <li>{comment.content}</li>
              </ul>
            ))}
          </p>
        </>
      ))}
    </div>
  );
}
