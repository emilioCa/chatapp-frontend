import React from 'react'
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
    const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="inbox_chat">
            {
                chats.map((chat) => (
                    <SidebarItem key={chat} />
                ))
            }
            <div className="extra_space"></div>
        </div>
    )
}
