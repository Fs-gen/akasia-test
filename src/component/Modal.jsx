import React, { useEffect } from 'react';
import { gsap } from 'gsap';
const Modal = ({ isOpen, onClose, img }) => {
    if (!isOpen) {
        return null;
    }
    const saveImageBase64 = (base64String, fileName) => {
        const link = document.createElement('a');
        link.href = base64String;
        link.download = fileName;
        link.click();
    }

    useEffect(() => {
        gsap.fromTo(
            '.modals',
            { opacity: 0, y: -100, duration: 3 },
            { opacity: 1, y: 0, duration: 1, stagger: 0, ease: 'power.out', }
        );
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg z-10 modals">
                <div className='text-end cursor-pointer' onClick={onClose}>
                    <span className=''>✖</span>
                </div>
                <p className="mb-4">
                    <img src={img} className='w-full border-2 border-black-100' alt="" srcSet="" />
                </p>
                <div className='text-center'>
                    <button className='mt-3 rounded-full bg-blue-800 text-white py-2 px-4 text-xs' onClick={() => saveImageBase64(img, 'gambar.png')}>

                        <div className="inline-block align-middle me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                            </svg>
                        </div>
                        Download Image</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
