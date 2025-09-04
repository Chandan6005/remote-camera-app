import React from 'react';

function Remote() {
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const socket = new WebSocket('https://remote-camera-webapp.onrender.com');

    const joinRoom = () => {
        socket.send(JSON.stringify({ type: 'join', roomId }));
        setJoined(true);
    };

    const sendTrigger = () => {
        socket.send(JSON.stringify({ type: 'trigger', roomId }));
    };
    
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2> Remote Trigger</h2>
            {!joined ? (
                <>
                    <input
                        type="text"
                        placeholder='Enter Room ID'
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={joinRoom} style={btnStyle}>Join Room</button>
                </>
            ): (
                <button onClick={sendTrigger} style={btnStyle}>Send Capture Signal</button>
            )}
        </div>
    );
}

const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
};

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