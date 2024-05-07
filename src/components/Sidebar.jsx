import React from 'react';
import '../style/SideBar.css';
import dashboard from '../assets/icons/sidebar/dashboard.svg';
import dry_leaves from '../assets/icons/sidebar/dry_leaves.svg';
import leaves_distribution from '../assets/icons/sidebar/leaves_distribution.svg';
import performance from '../assets/icons/sidebar/performance.svg';
import pickup from '../assets/icons/sidebar/pickup.svg';
import powder from '../assets/icons/sidebar/powder.svg';
import reception from '../assets/icons/sidebar/reception.svg';
import shipment from '../assets/icons/sidebar/shipment.svg';
import wet_leaves from '../assets/icons/sidebar/wet_leaves.svg';
import leafty_Logo from '../assets/LeaftyLogo2.svg';

const Sidebar = () => {
  return (
    <div className='menu'>
        <div className='logo'>
            <img src={leafty_Logo} className='logo-icon' />
        </div>
        <div className="menu-list">
            <a href="#" className="item">
                <img src={dashboard} className='logo-list' />
                Dashboard
            </a>
            <a href="#" className="item">
                <img src={leaves_distribution} className='logo-list' />
                Leaves Distribution
            </a>
            <a href="#" className="item">
                <img src={shipment} className='logo-list' />
                Shipment
            </a>
            <a href="#" className="item">
                <img src={pickup} className='logo-list' />
                Pickup
            </a>
            <a href="#" className="item">
                <img src={reception} className='logo-list' />
                Reception
            </a>
            <a href="#" className="item">
                <img src={performance} className='logo-list' />
                Performance
            </a>
        </div>
    </div>
  )
}

export default Sidebar
