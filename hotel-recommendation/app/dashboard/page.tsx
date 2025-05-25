import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // or use relative path if needed

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-center mt-10 text-red-500">You must be logged in to view this page.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
