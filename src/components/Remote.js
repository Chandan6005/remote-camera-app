import React from 'react';

function Remote() {
    const socket = new WebSocket('https://remote-camera-webapp.onrender.com');
    const sendTrigger = () => {
        socket.send('capture');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2> Remote Trigger</h2>
            <button onClick={sendTrigger} style={btnStyle}>Send Capture Signal</button>
        </div>
    );
}

    const btnStyle = {
        padding: '15px 30px',
        fontSize: '1.2em',
        background: '#ff416c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
};

export default Remote;