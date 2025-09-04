import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera() {
    const webcamRef = useRef(null);
    const [roomId, setRoomId] = useState('');
    const [created, setCreated] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const socket = new WebSocket('https://remote-camera-webapp.onrender.com');

    const createRoom = () => {
        socket.send(JSON.stringify({ type: 'join', roomId }));
        setCreated(true);
    };

    socket.onmessage = (event) => {
        if (event.data === 'capture') {
            const screenshot = webcamRef.current.getScreenshot();
            setImageSrc(screenshot);
        }
    };
    
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2> Camera Listener</h2>
            {!created ? (
                <>
                    <input
                        type="text"
                        placeholder='Create Room ID'
                        value={roomId}
                        onChange={e => setRoomId(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={createRoom} style={btnStyle}>Create Room</button>
                </>
            ) : (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        style={{ width: '80%', borderRadius: '10px' }}
                    />
                    {imageSrc && (
                        <>
                            <img src={imageSrc} alt='Captured' style={{ marginTop: '20px', maxWidth: '80%' }} />
                            <a
                                href={imageSrc}
                                download={`capture_${Date.now()}.jpg`}
                                style={downloadBtn}
                            >
                                Download Image
                            </a>
                        </>
                    )}
                </>
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
        background: '#00b894',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
};

const downloadBtn = {
    display: 'inline-block',
    marginTop: '15px',
    padding: '12px 24px',
    background: '#00b894',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none'
};

export default Camera;