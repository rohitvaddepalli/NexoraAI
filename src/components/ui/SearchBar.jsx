import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ placeholder = 'Search 500+ AI tools...', className = '' }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666680] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1A1A24] border border-[#1E1E2E] rounded-xl pl-12 pr-4 py-3.5 text-[#E8E8F0] placeholder-[#666680] focus:border-[#7C6EF5] focus:ring-2 focus:ring-[#7C6EF5]/20 transition-all text-base" />
      
    </form>);

}