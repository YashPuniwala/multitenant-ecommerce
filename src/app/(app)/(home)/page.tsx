import { getSession } from "@/actions/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Funroad</h1>
      {session?.user ? (
        <div>
          <p>Welcome back, {session.user.email}!</p>
          <pre className="bg-gray-100 p-4 rounded mt-4">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  );
}