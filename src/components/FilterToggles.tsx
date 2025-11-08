import { CategoryToggle } from '../types'

interface FilterTogglesProps {
  toggles: CategoryToggle
  onToggle: (category: keyof CategoryToggle) => void
}

export default function FilterToggles({ toggles, onToggle }: FilterTogglesProps) {
  const categories = [
    { label: 'Body Language', category: 'body-language' as keyof CategoryToggle, color: 'green' },
    { label: 'Vocal', category: 'vocal' as keyof CategoryToggle, color: 'blue' },
    { label: 'Speech', category: 'speech' as keyof CategoryToggle, color: 'red' },
  ]

  const getToggleButtonClass = (isOn: boolean, color: string) => {
    const baseClass = 'px-3 py-1.5 rounded-lg font-medium transition-all w-full text-sm'
    if (isOn) {
      const colorClasses = {
        green: 'bg-green-100 text-green-800 border-2 border-green-300',
        blue: 'bg-blue-100 text-blue-800 border-2 border-blue-300',
        red: 'bg-red-100 text-red-800 border-2 border-red-300',
      }
      return `${baseClass} ${colorClasses[color as keyof typeof colorClasses]}`
    }
    return `${baseClass} bg-gray-100 text-gray-600 border-2 border-gray-300`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Filter Categories</h2>
      <div className="space-y-2">
        {categories.map((item) => (
          <button
            key={item.category}
            onClick={() => onToggle(item.category)}
            className={getToggleButtonClass(toggles[item.category], item.color)}
          >
            {item.label} {toggles[item.category] ? '[ON]' : '[OFF]'}
          </button>
        ))}
      </div>
    </div>
  )
}

