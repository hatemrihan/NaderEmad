import Link from 'next/link';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-stone-800 rounded-lg shadow-xl p-8 text-center">
        <div className="mb-4 text-green-400">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">Submission Successful!</h2>
        <p className="text-gray-300 mb-8">
        You have been added to our waitlist. We will get back to you soon.
        </p>
        <Link 
          href="/"
          className="inline-block bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 