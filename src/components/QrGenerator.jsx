import React from 'react'
import ReactDOM from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import toImg from 'react-svg-to-image';



const QrGenerator = () => {

    const [input, setinput] = useState("")
    const [qrVisible, setqrVisible] = useState(false)
    const [showButton, setshowButton] = useState(false)

    const isValidInput = (str) => {
        const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/\S*)?$/;
        return pattern.test(str);
    }



    const generateQr = () => {
        if (input.trim() !== "" && isValidInput(input.trim())) {

            setqrVisible(true);
            setinput("")

        }
        else {
            alert("Enter valid URL")
        }

        setshowButton(true)
    }


    const downloadButton = () => {
        toImg('svg', 'qr-code');
    }

    const shareButton = async () => {

            try {
                const svgElement = document.querySelector('svg');
                const serializer = new XMLSerializer();
                const svgString = serializer.serializeToString(svgElement);
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });

              
                const img = new Image();
                const url = URL.createObjectURL(svgBlob);
                img.src = url;

                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(async (blob) => {
                        const file = new File([blob], 'qr-code.png', { type: 'image/png' });

                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                files: [file],
                                title: 'QR Code',
                                text: 'Scan this QR code',
                            });
                        } else {
                            alert('Sharing not supported on this device.');
                        }

                        URL.revokeObjectURL(url);
                    }, 'image/png');
                };
            } catch (error) {
                alert('Failed to share the QR code');
                console.error(error);
            }
        



    }

    return (

        <div >
            <div className='text-center flex flex-col items-center'>
                <input value={input} onChange={(e) => {
                    setinput(e.target.value)
                    setqrVisible(false)
                }} className='p-4 border border-blue-500 rounded-4xl sm:min-w-2xl my-8' type="text" name="input" id="input" placeholder='Enter the URL here' />

                <button onClick={generateQr} type="button" className="text-white bg-gradient-to-r from-blue-800 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-4xl text-xl px-20 py-2.5 text-center me-2 mb-2" >Generate</button>

            </div>

            {
                qrVisible && (
                    <div className="flex flex-col ">
                        <div className="mx-auto my-8">
                            <QRCodeSVG id='qr-code' value={input} size={150} />
                        </div>
                    </div>

                )

            }


            {
                showButton && (
                    <div className="buttons flex justify-center gap-4 items-center mt-6">

                        <button onClick={downloadButton}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white rounded-full shadow-lg transition-all duration-200"
                            title="Download"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 9c-.6 0-1-.4-1-1 0-3.9 3.1-7 7-7 3 0 5.7 2 6.7 4.9.1.5-.1 1.1-.7 1.2-.5.2-1.1-.1-1.3-.6C15.1 4.4 13.2 3 11 3 8.2 3 6 5.2 6 8c0 .6-.4 1-1 1z" />
                                <path d="M18 17c-.6 0-1-.4-1-1s.4-1 1-1c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.3 0-.7 0-1 .1-.5.1-1.1-.2-1.2-.7-.1-.5.2-1.1.7-1.2.5-.1 1-.2 1.5-.2 3.3 0 6 2.7 6 6s-2.7 6-6 6zM8 17H5c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1 .4 1 1s-.4 1-1 1z" />
                                <path d="M18 17h-2c-.6 0-1-.4-1-1s.4-1 1-1h2c.6 0 1 .4 1 1s-.4 1-1 1zM5 17c-2.8 0-5-2.2-5-5s2.2-5 5-5c.6 0 1 .4 1 1s-.4 1-1 1c-1.7 0-3 1.3-3 3s1.3 3 3 3c.6 0 1 .4 1 1s-.4 1-1 1zm7 6c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1s1 .4 1 1v9c0 .6-.4 1-1 1z" />
                                <path d="M12 23c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3 3c-.2.2-.4.3-.7.3z" />
                                <path d="M12 23c-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3 3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z" />
                            </svg>
                        </button>


                        <button onClick={shareButton}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white rounded-full shadow-lg transition-all duration-200"
                            title="Share"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M26 0H6a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6zm-6.678 19.626a2.955 2.955 0 1 1-1.176 2.358v-.002l-7.538-3.644a2.942 2.942 0 0 1-1.6.474 2.957 2.957 0 0 1 0-5.912c.696 0 1.334.242 1.84.644l7.296-3.524v-.002a2.955 2.955 0 1 1 1.176 2.358l-7.36 3.556c0 .044-.004.09-.006.134l7.368 3.56z" />
                            </svg>
                        </button>


                    </div>


                )

            }



        </div >


    )

}
export default QrGenerator
