import { Link } from 'react-router-dom';
import { SidebarMenuItem } from './Sidebar.tsx';
import React from 'react';

const SidebarListItem: React.FC<SidebarMenuItem> = ({icon, to, title}: SidebarMenuItem) => {
    return (
        <li>
            {icon}
            <Link to={to}>{title}</Link>
        </li>
    )
}

export default SidebarListItem;