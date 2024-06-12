import './Sidebar.css';
import SidebarListItem from './SidebarListItem.tsx';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ReactElement } from 'react';

export interface SidebarMenuItem {
    icon: ReactElement;
    to: string;
    title: string;
}

const SidebarMenuItems: SidebarMenuItem[] = [{
    icon: <HomeOutlinedIcon />,
    to: '/',
    title: 'Home'
}, {
    icon: <HikingOutlinedIcon />,
    to: '/trips',
    title: 'Trips'
},{
    icon: <AssignmentIndOutlinedIcon />,
    to: '/vendors',
    title: 'Vendors'
}, {
    icon: <Diversity3Icon />,
    to: '/users/partners-search',
    title: 'Partner search'
}, {
    icon: <FavoriteBorderIcon />,
    to: '/wishlist',
    title: 'Wishlist'
}, {
    icon: <SettingsOutlinedIcon />,
    to: '/settings',
    title: 'Settings'
}]

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                {SidebarMenuItems.map(item => <SidebarListItem
                    icon={item.icon}
                    to={item.to}
                    title={item.title}
                    key={item.title}
                />)}
            </ul>
        </div>
    );
}

export default Sidebar;