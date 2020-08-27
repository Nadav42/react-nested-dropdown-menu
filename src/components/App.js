import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownSubMenu, DropdownItem } from './Dropdown';
import { MdDelete, MdTranslate } from "react-icons/md";
import '../main.css';

const ButtonTest = ({ toggleOpen }) => {
	return (
		<button className="btn btn-secondary dropdown-toggle" onClick={toggleOpen}>Dropdown button</button>
	);
}

const ButtonTest2 = ({ toggleOpen }) => {
	return (
		<button className="btn btn-primary" onClick={(e) => toggleOpen(e)}>X</button>
	);
}

const App = () => {
	return (
		<div className="container mt-5 drop-test">
			<span>
				<DropdownMenu Button={ButtonTest}>
					<DropdownSubMenu>
						<DropdownItem title="Device" switchToMenu="devices" />
						<DropdownItem title="Theme" switchToMenu="themes" />
						<DropdownItem title="Set alt text" />
						<DropdownItem title="Remove" rightIcon={<MdDelete />} rightCircle />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="devices" >
						<DropdownItem title="Desktop" />
						<DropdownItem title="Mobile" />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="themes" >
						<DropdownItem title="Game" />
						<DropdownItem title="Paylines" />
						<DropdownItem title="Big Win" />
						<DropdownItem title="Free Spins" />
						<DropdownItem title="Paytable" />
						<DropdownItem title="Bonus" />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="language" >
						<DropdownItem title="English" />
						<DropdownItem title="French" />
					</DropdownSubMenu>
				</DropdownMenu>
			</span>
			<span>
				<DropdownMenu Button={ButtonTest2}>
					<DropdownItem title="Translations" rightIcon={<MdTranslate />} />
					<DropdownItem title="Remove" rightIcon={<MdDelete />} />
				</DropdownMenu>
			</span>
			<span>
				<DropdownMenu Button={ButtonTest2}>
					<DropdownSubMenu>
						<DropdownItem title="Device" switchToMenu="devices" />
						<DropdownItem title="Theme" switchToMenu="themes" />
						<DropdownItem title="Set alt text" />
						<DropdownItem title="Remove" rightIcon={<MdDelete />} rightCircle />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="devices" >
						<DropdownItem title="Desktop" />
						<DropdownItem title="Mobile" />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="themes" >
						<DropdownItem title="Game" />
						<DropdownItem title="Paylines" />
						<DropdownItem title="Big Win" />
						<DropdownItem title="Free Spins" />
						<DropdownItem title="Paytable" />
						<DropdownItem title="Bonus" />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="language" >
						<DropdownItem title="English" />
						<DropdownItem title="French" />
					</DropdownSubMenu>
				</DropdownMenu>
			</span>
		</div >
	);
};

export default App;
