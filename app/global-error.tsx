'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
            <p className="text-gray-600 mb-6">
              The application encountered a critical error.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}