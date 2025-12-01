"use client"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all border-2 ${
            selectedTags.includes(tag)
              ? "bg-blue-500 text-white border-blue-500 shadow-md hover:shadow-lg hover:bg-blue-600"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
