export default function KeyHighlights({ keyHighlights = [] }) {
  return (
    <div className="md:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm transition-colors duration-200">
      <h3 className="font-bold mb-4 text-zinc-800 dark:text-zinc-200">Key Highlights</h3>

      <ul className="space-y-3 text-sm text-gray-600 dark:text-zinc-400">
        {keyHighlights.length > 0 ? (
          keyHighlights.map((item, index) => (
            <li key={index}>&#x21e8; {item}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
}