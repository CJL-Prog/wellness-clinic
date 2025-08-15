export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Style Test Page</h1>
      
      {/* Test if Tailwind is loading */}
      <div className="mb-8 p-4 bg-blue-100 border-2 border-blue-500 rounded-lg">
        <p className="text-lg font-semibold text-blue-900 mb-2">If this box has a blue background and border, Tailwind is working!</p>
        <p className="text-sm text-gray-600">This text should be small and gray</p>
        <p className="text-base text-gray-800">This text should be normal size</p>
        <p className="text-xl text-gray-900">This text should be large</p>
        <p className="text-3xl font-bold">This text should be very large</p>
      </div>

      {/* Test different icon sizes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Icon Size Tests:</h2>
        
        <div className="flex items-center gap-4 mb-4">
          <span>Small (w-4 h-4):</span>
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span>Medium (w-6 h-6):</span>
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span>Large (w-8 h-8):</span>
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span>Extra Large (w-12 h-12):</span>
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Test buttons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Button Tests:</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Styled Button
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700">
            Large Button
          </button>
        </div>
      </div>

      {/* Test card */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Card Test:</h2>
        <div className="max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">This is a card</h3>
          <p className="text-gray-600 mb-4">If this has a white background with shadow and rounded corners, styles are working.</p>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Working properly</span>
          </div>
        </div>
      </div>

      {/* Raw HTML test */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Raw HTML (no Tailwind):</h2>
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '16px',
          border: '2px solid #333',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '18px', color: '#333' }}>
            This uses inline styles. If this looks styled but the above doesn't, Tailwind isn't loading.
          </p>
        </div>
      </div>

      {/* Browser info */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Debug Info:</h2>
        <p className="font-mono text-sm">Window width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</p>
        <p className="font-mono text-sm">Base font size: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).fontSize : 'N/A'}</p>
        <p className="font-mono text-sm">Zoom level: Check if your browser zoom is at 100% (Ctrl+0 to reset)</p>
      </div>
    </div>
  );
}