import React from 'react'
import '../css/chat.css'

// Components
import { InboxPeople } from '../components/layout/InboxPeople';
import { Messages } from '../components/messages/Messages';
// import { SelectChat } from '../components/SelectChat';

const ChatPage = () => {
    return (
        <div className="messaging">
            <div className="inbox_msg">
                <InboxPeople />

                {/* <SelectChat /> */}
                <Messages />
            </div>
        </div>
    )
}

export default ChatPage;