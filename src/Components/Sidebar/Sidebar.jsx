import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { prevPrompt, setRescentPrompt, onSet, newChat } = useContext(Context);

    const handleMenu = () => {
        setExtended(prev => !prev);
    };
    const loadPrompt = async (prompt) => {
        setRescentPrompt(prompt)
        await onSet(prompt)
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img src={assets.menu_icon} className='menu' alt="Menu" onClick={handleMenu} />
                <div className="new-chat" onClick={() => newChat()}>
                    <img src={assets.plus_icon} className='menu' alt="New Chat" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended &&
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((value, index) => (
                            <div onClick={() => loadPrompt(value)} className="recent-entry" key={index}>
                                <img src={assets.message_icon} className='menu' alt="Recent Message" />
                                <p>{value.slice(0, 15)}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} className='' alt="Help" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} className='' alt="History" />
                    {extended && <p>History</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} className='' alt="Settings" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
