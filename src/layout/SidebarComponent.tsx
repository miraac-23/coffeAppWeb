import { FC } from 'react';

interface SideBarComponentProps {
    items: {
        url: string;
        icon: string;
        label: string;
    }[];
}

const SideBarComponent: FC<SideBarComponentProps> = ({ items }) => {

    return (
        <div>
            <div className="flex flex-column mt-3 gap-2">
                {items.map((item, key) => {
                    return (
                        <div key={key}>
                                <div className="flex flex-row gap-2 link font-bold cursor-pointer menu-item select-none border-left-3">
                                    <i className={item.icon}></i>
                                    {item.label}
                                </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SideBarComponent;