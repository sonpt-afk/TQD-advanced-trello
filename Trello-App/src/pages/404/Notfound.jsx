import React from 'react'
import './Notfound.scss'
const Notfound = () => {
return (
    <>
        <h1 className="nav">404 Not found</h1>
        <div className="display">
            <div className="display__img">
                <img src="/src/assets/Scarecrow.png" alt="404-Scarecrow" />
            </div>
            <div className="display__content">
                <h2 className="display__content--info">I have bad news for you</h2>
                <p className="display__content--text">
                    The page you are looking for might be removed or is temporarily
                    unavailable
                </p>
                <button className="btn">Back to homepage</button>
            </div>
        </div>
    </>
)
}

export default Notfound