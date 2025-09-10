"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC()
  const {data} = useQuery(trpc.auth.session.queryOptions())

  console.log(data, 'data')

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
