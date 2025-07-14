import { FC } from 'react';
import SideBarComponent from './SidebarComponent';

interface AppSideBarProps {
    sidebarItems: string[];
}

const AppSideBar: FC<AppSideBarProps> = ({ sidebarItems }) => {
    return (
        <div className="card bg-slate-600 h-full overflow-y-auto gap-2 flex flex-column">

        <SideBarComponent items={[]} />
        </div>
    );
}

export default AppSideBar;