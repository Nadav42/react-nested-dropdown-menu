import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownSubMenu, DropdownItem } from './Dropdown';
import { MdDelete, MdTranslate } from "react-icons/md";

const ButtonTest = ({ toggleOpen }) => {
	return (
		<button className="btn btn-secondary dropdown-toggle" onClick={toggleOpen}>Dropdown button</button>
	);
}

const ButtonTest2 = ({ toggleOpen }) => {
	return (
		<button className="btn btn-primary" onClick={toggleOpen}>X</button>
	);
}

const App = () => {
	return (
		<div className="container mt-5">
			<span>
				<DropdownMenu Button={ButtonTest}>
					<DropdownSubMenu>
						<DropdownItem title="Device" onClick={() => { console.log("clicked item #1") }} switchToMenu="devices" />
						<DropdownItem title="Theme" switchToMenu="themes" />
						<DropdownItem title="Set alt text" />
						<DropdownItem title="Remove" rightIcon={<MdDelete />} rightCircle />
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
		</div >
	);
};

export default App;
