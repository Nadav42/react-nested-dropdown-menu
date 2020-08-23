import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownSubMenu, DropdownItem } from './Dropdown';

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
						<DropdownItem title="Item #1" onClick={() => { console.log("clicked item #1") }} />
						<DropdownItem title="Item #2" />
						<DropdownItem title="Themes" switchToMenu="themes" />
					</DropdownSubMenu>
					<DropdownSubMenu menuKey="themes" >
						<DropdownItem title="Theme #1" onClick={() => { console.log("clicked theme #1") }} />
						<DropdownItem title="Theme #2" />
						<DropdownItem title="Theme #3" />
					</DropdownSubMenu>
				</DropdownMenu>
			</span>
			<span>
				<DropdownMenu Button={ButtonTest2}>
					<DropdownItem title="Copy" />
					<DropdownItem title="Remove" onClick={() => { console.log("clicked remove") }} />
				</DropdownMenu>
			</span>
		</div >
	);
};

export default App;
