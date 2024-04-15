import React, { useContext, useState } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {

    const {
        onSet,
        input,
        loading,
        rescentPrompt,
        showResult,
        ResultData,
        setInput,
    } = useContext(Context)
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">


                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello , Mostafa</span></p>
                            <p>How can Help you today</p>

                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat </p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>

                    </> :
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{rescentPrompt}</p>

                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {
                                loading ?
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                    :
                                    <p dangerouslySetInnerHTML={{ __html: ResultData }}>{ }</p>
                            }

                        </div>
                    </div>

                }


                <div className="main-bottom">

                    <div className="search-box">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder='Enter a promt here' />
                        <div className="img-input">
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img src={assets.send_icon} alt="" onClick={() => onSet()} /> : null}

                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info
                    </p>
                </div>


            </div>

        </div >
    )
}

export default Main