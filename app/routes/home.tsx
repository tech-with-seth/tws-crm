import type { Route } from "./+types/home";

const APP_NAME = "TWS CRM";

export function meta({}: Route.MetaArgs) {
  return [
    { title: APP_NAME },
    { name: "description", content: `Welcome to ${APP_NAME}!` },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">{`Welcome to ${APP_NAME}`}</h1>
    </>
  );
}
