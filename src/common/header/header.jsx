import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/images/header_logo.png';
import avatar from '../../assets/images/avatar.png';

const headerView = (props) =>{
    const header = <div className="header">
                        <img src={logo} alt="Logo" className="header__logo" />
                        <div className="header__right">
                            <img src={avatar} alt="Logo" roundedCircle className="header__roundlogo" />
                                <DropdownButton id="dropdown-basic-button" variant="secondary" className="header__dropdown" title="Vinod Kumar">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                                    <Dropdown.Item onClick={props.logOut}>Logout</Dropdown.Item>
                                </DropdownButton>
                        </div>
                    </div>

    return header;
}

export default headerView;