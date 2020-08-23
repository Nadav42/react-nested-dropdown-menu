import React, { useState, useEffect } from 'react';

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
export const DropdownItem = ({ title, switchToMenu, changeActiveMenu, closeMenu, onClick }) => {
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

    return (
        <a className="dropdown-item" href="#" onClick={handleClick}>{title}</a>
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
                    <DropdownItem title="Back" onClick={() => changeActiveMenu(null)} />
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

    // inject sub menus with the active menu prop
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...child.props, activeMenu: activeMenu, changeActiveMenu: changeActiveMenu, closeMenu: closeMenu });
        }
        return child;
    });

    return (
        <>
            <div className="dropdown" style={{ display: "inline-block" }}>
                <Button toggleOpen={toggleOpen} />
                <DropdownMenuBody open={isOpen}>
                    {childrenWithProps}
                </DropdownMenuBody>
            </div>
        </>
    );
}