import classNames from 'classnames'

type ColorsFilterProps = {
  colors: string[]
  activeColors: string[]
  changeFilters: (key: string, value: string) => () => void
}

export const ColorsFilter = ({colors, activeColors, changeFilters}: ColorsFilterProps) => (
  <div className="flex justify-start items-center mb-8">
    <div className="mr-4">COLORS:</div>
    {colors.map((color: string) => {
      const newColor = color.toLocaleLowerCase()
      return (
        <div
          key={color}
          className="flex flex-col justify-center items-center"
        >
          <div
            className={`group relative mx-0.5 rounded-full h-5 w-5 bg-ui${newColor} cursor-pointer`}
            onClick={changeFilters('colors', color)}
          >
            <div className={classNames('absolute -top-8 -left-4 opacity-0 group-hover:opacity-100 transition-all',
              '-translate-y-6 group-hover:translate-y-0')}
            >
              {color}
            </div>
          </div>
          <div className={`w-1 p-1 rounded-full ${activeColors.includes(color) ? 'bg-black' : ''} mt-1`}/>
        </div>
      )
    })}
  </div>

)
