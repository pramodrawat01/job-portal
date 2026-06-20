import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 mt-2">Page Not Found</p>

      <Link
        to="/home"
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;