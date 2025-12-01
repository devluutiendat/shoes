import { TagFilter } from "./Tag-filter";

const availableTags = [
  "Men",
  "Women",
  "Books",
  "Running",
  "Sports",
  "Casual",
  "Skateboarding",
  "Basketball",
];

interface TagProps {
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
  handleClearTags: () => void;
}

const Tag = ({ selectedTags, handleTagToggle, handleClearTags }: TagProps) => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Filter by Category
        </h2>

        <TagFilter
          tags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
      </div>

      {selectedTags.length > 0 && (
        <section className="mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active filters:
            </span>

            <ul className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800"
                >
                  {tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 hover:opacity-70 transition-opacity"
                    aria-label={`Remove ${tag} filter`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleClearTags}
              className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline transition-colors"
            >
              Clear all
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tag;
