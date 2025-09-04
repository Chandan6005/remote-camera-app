import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

function Camera() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('https://remote-camera-webapp.onrender.com');
        socket.onmessage = (event) => {
            if (event.data === 'capture') {
                const screenshot = webcamRef.current.getScreenshot();
                setImageSrc(screenshot);
            }
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2> Camera Listener</h2>
            <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            style={{ width: '80%', borderRadius: '10px' }}
        />
        {imageSrc && (
            <>
                <img src={imageSrc} alt="Captured" style={{ marginTop: '20px', maxWidth: '80%' }} />
                <a
                    href={imageSrc}
                    download={`capture_${Date.now()}.jpg`}
                    style={downloadBtn}
                >
                    Download Image
                </a>
            </>
        )}
        </div>
    );
}

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