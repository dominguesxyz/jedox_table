import React from 'react';
import styles from '../styles/filterDropdown.module.css';

type Option = {
  name: string;
  hierarchyLevel: number;
};

type FilterDropdownProps = {
  dimension: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  dimension,
  options,
  selected,
  onChange,
}) => (
  <div className={styles.container}>
    <label className={styles.label}>{dimension}:</label>
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={styles.dropdown}
    >
      <option value="">--Select--</option>
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
