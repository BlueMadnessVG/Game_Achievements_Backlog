import styles from "./css/SearchInput.module.css"
import SearchIcon from "../../../assets/icons/search.svg";
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className={styles.searchInputWrapper}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e => onChange(e.target.value))}
      />
      <span className={styles.searchIcon}>
        <img src={SearchIcon} alt="Search" />
      </span>
    </div>
  )
}
