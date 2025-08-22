interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <input
      className="search-input"
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
    />
  )
}
