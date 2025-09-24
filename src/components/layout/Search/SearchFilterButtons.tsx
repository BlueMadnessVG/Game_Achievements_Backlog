import styles from "./css/SearchFilterButtons.module.css"

interface SearchFilterButtonsProps {
    iconSrc: string;
    label: string;
    onClick?: () => void;
}

export const SearchFilterButtons = ({ iconSrc, label, onClick }: SearchFilterButtonsProps) => {
    return (
        <button className={styles.searchFilterButton} onClick={onClick}>
            <img src={iconSrc} alt={label} />
        </button>
    )
}