import { getCategoryColor } from '../../utils/helpers';

export default function CategoryBadge({ category, size = 'sm' }) {
  const color = getCategoryColor(category);
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-[13px] px-3 py-1';
  return (
    <span
      className={`inline-block font-medium rounded-full border ${sizeClass}`}
      style={{
        color,
        backgroundColor: `${color}15`,
        borderColor: `${color}25`
      }}>
      
      {category}
    </span>);

}