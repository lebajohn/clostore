
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold mb-4">
        404 - Page Not Found
      </h1>

      <Link href="/" className="text-blue-500">
        Go Home
      </Link>

    </div>
  );
}