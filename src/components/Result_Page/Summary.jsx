export default function Summary({ summary = "" }) {
  return (
    <div className="md:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm transition-colors duration-200">
      <h3 className="font-bold mb-4 text-zinc-800 dark:text-zinc-200">Summary</h3>

      {summary ? (
        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
          {summary}
        </p>
      ) : (
        <p className="text-sm text-gray-400">
          No summary available
        </p>
      )}
    </div>
  );
}