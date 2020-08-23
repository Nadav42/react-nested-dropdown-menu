import React, { useState, useRef, useEffect } from 'react';
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import "./Dropdown.css";

// hook
function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (callback) {
                    callback();
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside); // Bind the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);  // Unbind the event listener on clean up
        };
    }, [ref, callback]);
}

// for inner usage
const DropdownMenuBody = ({ open, children }) => {
    const baseClass = open ? "dropdown-menu show" : "dropdown-menu";

    if (!open) {
        return null;
    }

    return (
        <div className={baseClass}>
            {children}
        </div>
    );
}

// dropdown menu list item (needs to be a child of DropdownMenu)
export const DropdownItem = ({ title, switchToMenu, changeActiveMenu, closeMenu, leftIcon, rightIcon, onClick, className }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        if (switchToMenu && changeActiveMenu) {
            changeActiveMenu(switchToMenu);
        }
        else if (!switchToMenu && closeMenu) {
            closeMenu();
        }
    }

    const containerClass = className ? `dropdown-item dropdown-item-container ${className}` : "dropdown-item dropdown-item-container";

    if (switchToMenu) {
        rightIcon = <MdArrowForward />;
    }

    if (leftIcon && rightIcon) {
        return (
            <a className={containerClass} href="#" onClick={handleClick}>
                <div className={`dropdown-item-title`}>
                    <span className="title-icon">{leftIcon}</span>
                    <span className="title-text">{title}</span>
                </div>
                <span className="dropdown-item-right-icon">{rightIcon}</span>
            </a>
        );
    }

    if (rightIcon) {
        return (
            <a className={containerClass} href="#" onClick={handleClick}>
                <div className="dropdown-item-title">
                    <span className="title-text">{title}</span>
                </div>
                <span className="dropdown-item-right-icon">{rightIcon}</span>
            </a>
        );
    }

    if (leftIcon) {
        return (
            <a className={containerClass} href="#" onClick={handleClick}>
                <div className="dropdown-item-title">
                    <span className="title-icon">{leftIcon}</span>
                    <span className="title-text">{title}</span>
                </div>
            </a>
        );
    }

    return (
        <a className={containerClass} href="#" onClick={handleClick}>
            <div className="dropdown-item-title">
                <span className="title-text">{title}</span>
            </div>
        </a>
    );
}

// dropdown menu sub menu (needs to be a child of DropdownMenu)
export const DropdownSubMenu = ({ menuKey, activeMenu, changeActiveMenu, closeMenu, children }) => {
    if ((!activeMenu && menuKey) || (activeMenu && activeMenu !== menuKey)) {
        return null;
    }

    if (changeActiveMenu) {
        // inject dropdown items with the changeActiveMenu prop
        const childrenWithProps = React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { ...child.props, changeActiveMenu: changeActiveMenu, closeMenu: closeMenu });
            }
            return child;
        });

        // sub menu (activeMenu is not null)
        if (activeMenu) {
            return (
                <>
                    <DropdownItem title="Back" className="back-btn" onClick={() => changeActiveMenu(null)} leftIcon={<MdArrowBack />} />
                    <div class="dropdown-divider"></div>
                    {childrenWithProps}
                </>
            );
        }

        return <>{childrenWithProps}</>; // main menu (activeMenu is null)
    }

    return <>{children}</>;
}

// DropdownMenu
export const DropdownMenu = ({ Button, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const wrapperRef = useRef(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setActiveMenu(null);
    }

    const closeMenu = () => {
        setIsOpen(false);
        setActiveMenu(null);
    }

    const changeActiveMenu = (menuKey) => {
        setActiveMenu(menuKey);
    }

    useOutsideAlerter(wrapperRef, closeMenu); // close dropdown if clicked outside

    // inject sub menus with the active menu prop
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...child.props, activeMenu: activeMenu, changeActiveMenu: changeActiveMenu, closeMenu: closeMenu });
        }
        return child;
    });

    return (
        <>
            <div className="dropdown" style={{ display: "inline-block" }} ref={wrapperRef}>
                <Button toggleOpen={toggleOpen} />
                <DropdownMenuBody open={isOpen}>
                    {childrenWithProps}
                </DropdownMenuBody>
            </div>
        </>
    );
}