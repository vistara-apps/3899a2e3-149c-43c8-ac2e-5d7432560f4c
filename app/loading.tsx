export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-golden-200 border-t-golden-500 rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <div className="h-4 bg-golden-200 rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-golden-100 rounded w-24 mx-auto animate-pulse"></div>
        </div>
        <p className="text-golden-700 font-medium">Loading Morpho Pulse...</p>
      </div>
    </div>
  );
}
