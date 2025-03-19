import { LogOut, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import styles from './ProfileDropDown.module.css'
import { GenericApiContext } from "../../context/GenericApiContext";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({ open, setOpen }) => {

  const context = useContext(GenericApiContext)
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const handleLogout = () => {
    const url = 'integration/customer/revoke-customer-token';
    context.getPostDataQuick(url, 'logout')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (context.logout) {
      sessionStorage.removeItem('CustomerToken');
      sessionStorage.removeItem('QuoteID');
      sessionStorage.removeItem('loginDetails');
      window.location.reload()
      navigate('/')
    }
  }, [context.logout])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={styles.dropdownContainer}
        >
          <div
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
            style={{ cursor: 'pointer' }}
            onClick={() => { setOpen(false); navigate('/myProfile') }}
          >
            <User size={16} /> Profile
          </div>
          <div
            className="flex items-center gap-2 p-2 hover:bg-red-100 text-red-600 cursor-pointer rounded-md"
            style={{ cursor: 'pointer' }}
            onClick={() => { setOpen(false); handleLogout() }}
          >
            <LogOut size={16} /> Logout
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropDown;
