export default function ScoreCard({ score }) {

  const getPercentile = (score) => {
    if (score >= 90) return "Top 5% of candidates";
    if (score >= 80) return "Top 10% of candidates";
    if (score >= 70) return "Top 20% of candidates";
    if (score >= 60) return "Top 35% of candidates";
    if (score >= 50) return "Top 50% of candidates";
    return "Needs improvement";
  };

  return (
    <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm text-center transition-colors duration-200">
      <h3 className="font-bold mb-4 text-zinc-800 dark:text-zinc-200">Overall Resume Score</h3>

      <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
        {score ? (
          <p>
            {score}
          </p>
        ) : (
          <p>
            No summary available
          </p>
        )}
      </div>

      <p className="text-gray-500 dark:text-zinc-400 text-sm">
        {typeof score === "number"
          ? getPercentile(score)
          : "No score available"}
      </p>
    </div>
  );
}