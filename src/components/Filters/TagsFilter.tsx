import classNames from 'classnames'

type TagsFilterProps = {
  tags: string[]
  activeTags: string[]
  changeFilters: (key: string, value: string) => () => void
}

export const TagsFilter = ({tags, activeTags, changeFilters}: TagsFilterProps) => (
  <div className="flex justify-start items-center">
    <div className="mr-4">CATEGORIES:</div>
    <div className="w-full grid grid-cols-4 gap-2">
      {tags.map((tag: string) => (
        <div
          key={tag}
          className={classNames(`border-2 ${activeTags.includes(tag) ?  'border-orange-200' : 'border-gray-300'} rounded text-center`,
            'hover:bg-gray-50 transition-all cursor-pointer')}
          onClick={changeFilters('tags', tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  </div>
)
