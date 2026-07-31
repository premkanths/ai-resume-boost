export default function MissingSkills({ missingSkills = [] }) {

  return (
    <div className="md:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm transition-colors duration-200">
      <h3 className="font-bold mb-4 text-red-600 dark:text-red-400">Missing Skills</h3>
      
      {missingSkills.length > 0 ? (
        missingSkills.map((item, index) => (
          <div key={index} className="mb-2 p-2 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-transparent dark:border-red-900/30 rounded text-sm">
            {item}
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}