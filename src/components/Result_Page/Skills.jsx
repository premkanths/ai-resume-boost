export default function Skills( { skills = [] } ) {

  return (
    <div className="sm:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm transition-colors duration-200">
      <h3 className="font-bold mb-3 text-zinc-800 dark:text-zinc-200">Skills Detected</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}