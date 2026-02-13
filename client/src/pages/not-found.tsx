import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-accent text-gray-900 mb-4">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The dish you're looking for seems to be off the menu.
        </p>

        <Link href="/">
          <a className="inline-flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
