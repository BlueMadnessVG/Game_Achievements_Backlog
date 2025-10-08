import styles from "./css/ViewBar.module.css";
import { ViewButtons } from "./ViewButton";

import FilterIcon from "../../../assets/icons/Filter.svg";

export const ViewBar = () => {
  return (
    <div className={styles.ViewBar}>
      <p>View</p>
      <ViewButtons iconSrc={FilterIcon} label="Normal" onClick={() => {}} />
      <ViewButtons iconSrc={FilterIcon} label="Grid" onClick={() => {}} />
      <ViewButtons iconSrc={FilterIcon} label="Details" onClick={() => {}} />
    </div>
  );
};
