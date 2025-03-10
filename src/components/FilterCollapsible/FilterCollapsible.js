import React, { useState } from 'react';
import styles from './FilterCollapsible.module.css';
import { motion } from "framer-motion";
import { Plus, Dash } from 'react-bootstrap-icons';

const FilterCollapsible = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className={styles.header_text}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.title}
        {isOpen ? <Dash size={20} /> : <Plus size={20} />}
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className={styles.list + " bg-white space-y-2"}>
          {options.options.map((option, index) => (
            <li key={index} className={styles.filter_option}>
              <input type="radio" id={`option-${index}`} name="dropdown" />
              <label htmlFor={`option-${index}`} className="cursor-pointer">
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
};



export default FilterCollapsible;
