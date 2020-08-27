import React, { useState, useRef, useEffect } from 'react';
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import "./Dropdown.css";

// stop react warnings on empty href
const LinkWithoutWarnings = ({ className, onClick, href, children }) => {
    return <a className={className} onClick={onClick} href={href}>{children}</a>;
}

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

// hook
function useScrollAlerter(parent, bindCondition, callback) {
    useEffect(() => {
        const handleParentScroll = () => {
            if (callback) {
                callback();
            }
        }

        if (bindCondition) {
            console.log("bound scroll!")
            parent.addEventListener("scroll", handleParentScroll); // Bind the event listener
        }

        return () => {
            parent.removeEventListener("scroll", handleParentScroll);  // Unbind the event listener on clean up
        };
    }, [parent, bindCondition, callback]);
}

// hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

// for inner usage
const DropdownMenuBody = ({ open, xClickPos, yClickPos, activeMenu, children }) => {
    const menuRef = useRef(null);
    const [xPos, setXPos] = useState(xClickPos);
    const [yPos, setYPos] = useState(yClickPos);
    const [shouldHide, setShouldHide] = useState(true);
    const screenSize = useWindowSize();

    const spaceFromMouse = 5; // a bit of spacing from the click pos
    const baseClass = open ? "dropdown-menu show" : "dropdown-menu";
    let dropdownStyle = {};

    if (xPos != null && yPos != null) {
        dropdownStyle = { position: "fixed", top: yPos, left: xPos + spaceFromMouse };
    }

    if (shouldHide) {
        dropdownStyle.opacity = 0;
    }

    useEffect(() => {
        if (!open || xClickPos == null || yClickPos == null || !menuRef.current) {
            setShouldHide(false);
            return;
        }

        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let xLeft = xClickPos;
        let yTop = yClickPos;
        let tooltipHeight = menuRef.current.scrollHeight;
        let tooltipWidth = menuRef.current.scrollWidth;

        let needsFixing = false;

        // out of right border
        if (xLeft > screenWidth - tooltipWidth) {
            xLeft = xClickPos - tooltipWidth - (2 * spaceFromMouse);
            needsFixing = true;
        }

        // out of bottom border
        if (yTop > screenHeight - tooltipHeight) {
            //yTop = yTop - tooltipHeight - (2 * spaceFromMouse);
            yTop = yTop - tooltipHeight; //+ itemRect.height;
            needsFixing = true;
        }

        // if it goes out of right edge of screen AND left edge of screen then try putting it in the middle
        if (needsFixing && xLeft < 0) {
            let freeSpace = Math.max(screenWidth - tooltipWidth, 0); // if there is no space (negative) take 0
            xLeft = 0 + (freeSpace / 2) - (2 * spaceFromMouse);
        }

        // if it goes out of top edge of screen AND bottom edge of screen then try putting it in the middle
        if (needsFixing && yTop < 0) {
            let freeSpace = Math.max(screenHeight - tooltipHeight, 0); // if there is no space (negative) take 0
            //yTop = 0 + (freeSpace / 2) - (2 * spaceFromMouse);
            yTop = 0 + (freeSpace / 2);
        }

        if (xPos !== xLeft || yPos !== yTop) {
            needsFixing = true;
        }

        if (needsFixing) {
            console.log("needsFixing")
            setXPos(xLeft);
            setYPos(yTop);
        }

        setShouldHide(false);
    }, [open, xClickPos, yClickPos, activeMenu, screenSize, menuRef])

    if (!open) {
        return null;
    }

    return (
        <div className={baseClass} style={dropdownStyle} ref={menuRef}>
            {children}
        </div>
    );
}

// dropdown menu list item (needs to be a child of DropdownMenu)
export const DropdownItem = ({ title, switchToMenu, changeActiveMenu, closeMenu, leftIcon, rightIcon, leftCircle, rightCircle, onClick, className }) => {
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

    let containerClass = className ? `dropdown-item dropdown-item-container ${className}` : "dropdown-item dropdown-item-container";
    const rightIconClass = rightCircle ? "dropdown-item-right-icon circle" : "dropdown-item-right-icon";
    const leftIconClass = leftCircle ? "title-icon circle" : "title-icon";

    if (switchToMenu) {
        rightIcon = <MdArrowForward />;
        containerClass = containerClass + " dropdown-item-submenu";
    }

    if (leftIcon && rightIcon) {
        return (
            <LinkWithoutWarnings className={containerClass} onClick={handleClick}>
                <div className={`dropdown-item-title`}>
                    <span className={leftIconClass}>{leftIcon}</span>
                    <span className="title-text">{title}</span>
                </div>
                <span className={rightIconClass}>{rightIcon}</span>
            </LinkWithoutWarnings>
        );
    }

    if (rightIcon) {
        return (
            <LinkWithoutWarnings className={containerClass} onClick={handleClick}>
                <div className="dropdown-item-title">
                    <span className="title-text">{title}</span>
                </div>
                <span className={rightIconClass}>{rightIcon}</span>
            </LinkWithoutWarnings>
        );
    }

    if (leftIcon) {
        return (
            <LinkWithoutWarnings className={containerClass} onClick={handleClick}>
                <div className="dropdown-item-title">
                    <span className={leftIconClass}>{leftIcon}</span>
                    <span className="title-text">{title}</span>
                </div>
            </LinkWithoutWarnings>
        );
    }

    return (
        <LinkWithoutWarnings className={containerClass} onClick={handleClick}>
            <div className="dropdown-item-title">
                <span className="title-text">{title}</span>
            </div>
        </LinkWithoutWarnings>
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
                    <div className="dropdown-divider"></div>
                    {childrenWithProps}
                </>
            );
        }

        return <>{childrenWithProps}</>; // main menu (activeMenu is null)
    }

    return <>{children}</>;
}

// DropdownMenu
export const DropdownMenu = ({ Button, disableFixed, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [xClickPos, setXClickPos] = useState(null);
    const [yClickPos, setYClickPos] = useState(null);
    const wrapperRef = useRef(null);

    const toggleOpen = (e) => {
        if (e && e.clientX && e.clientY && !disableFixed) {
            setXClickPos(e.clientX);
            setYClickPos(e.clientY);
        }

        setIsOpen(!isOpen);
        setActiveMenu(null);
    }

    const closeMenu = () => {
        setIsOpen(false);
        setActiveMenu(null);
        setXClickPos(null);
        setYClickPos(null);
    }

    const changeActiveMenu = (menuKey) => {
        setActiveMenu(menuKey);
    }

    useOutsideAlerter(wrapperRef, closeMenu); // close dropdown if clicked outside
    useScrollAlerter(document, isOpen, () => {
        if (!disableFixed) {
            closeMenu();  // close dropdown when scrolling
        }
    });

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
                {isOpen ?
                    (
                        <DropdownMenuBody open={isOpen} xClickPos={xClickPos} yClickPos={yClickPos} activeMenu={activeMenu}>
                            {childrenWithProps}
                        </DropdownMenuBody>
                    )
                    : (
                        null
                    )
                }
            </div>
        </>
    );
}