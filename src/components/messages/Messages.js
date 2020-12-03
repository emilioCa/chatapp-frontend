import React from 'react'
import { IncomingMessages } from './IncomingMessages'
import { OutgoingMessages } from './OutgoingMessages'
import { SendMessage } from './SendMessage'

export const Messages = () => {
    const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="mesgs">
            <div className="msg_history">
                {
                    messages.map(message => (
                        (message % 2)
                            ? <IncomingMessages key={message} />
                            : <OutgoingMessages key={message} />
                    ))
                }
            </div>
            <SendMessage />
        </div>
    )
}
