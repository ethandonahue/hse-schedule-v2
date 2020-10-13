import Dropdown from 'react-dropdown';
import React from "react";
import 'react-dropdown/style.css';
import Tm from "./timeManager.js";

const options = [
  'A', 'B', 'C', 'None'
];
const defaultOption = options[0];


class DropdownMenu extends React.Component {
  render() {
    return(
      <div className="dropdown">
    <Dropdown class="dropdownBox" options={options} onChange={window.tm.setLunch} placeholder="Select lunch" />
    </div>
  );
  }
}

export default DropdownMenu;
