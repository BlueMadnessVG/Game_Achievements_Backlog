import styles from "./css/ViewButton.module.css";
interface ViewButtonsProps {
    iconSrc: string;
    label: string;
    onClick?: () => void;
}

export const ViewButtons = ({ iconSrc, label, onClick }: ViewButtonsProps) => {
    return (
        <button className={styles.viewButton} onClick={onClick}>
            <img src={iconSrc} alt={label} />
        </button>
    )
}