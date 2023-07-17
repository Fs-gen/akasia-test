import { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable';
import { gsap, Power4 } from 'gsap';
import html2canvas from 'html2canvas';
import './App.css'
import Modal from './component/Modal';
import debounce from './component/debounce';

function App() {
  const [text, setText] = useState("Hello world")
  const [size, setSize] = useState(34)
  const [color, setColor] = useState("text-black")
  const [image, setImage] = useState("")
  const [change, setChange] = useState(false)
  const [isOpen, setIsOpen] = useState(false);


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    gsap.fromTo(
      '.modals',
      { opacity: 1, y: 0, duration: 0.3 },
      { opacity: 0, y: -100, duration: 0.3, stagger: 0, ease: 'power.out', }
    );

    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };
  const textRef = useRef([])
  const targetElementRef = useRef(null)
  const textItems = text.split("")

  const captureElement = (element) => {
    html2canvas(element).then((canvas) => {
      const imageUrl = canvas.toDataURL()
      setImage(imageUrl)
    });
  };


  const debouncedOpen = debounce(openModal, 1000);

  const handleCaptureClick = () => {
    debouncedOpen();
    const element = targetElementRef.current;
    if (element) {
      captureElement(element);
    }
  };

  useEffect(() => {
    // Animation function
    const animateText = () => {
      const domNode = textRef.current;
      domNode.forEach((el, index) => {
        const yOffset = index % 2 === 0 ? '50px' : '-50px'; // Distance to move up/down
        const duration = 1; // Animation duration

        gsap.fromTo(
          el,
          { y: yOffset, opacity: 0, delay: 0.5, },
          {
            y: 0,
            duration,
            opacity: 1,
            delay: 0.5,
            ease: Power4.easeOut,
          }
        );
      });
    };

    animateText();

    setChange(true)
    setTimeout(() => {
      setChange(false)
    }, 500);
  }, [text]);




  return (
    <div >
      <div className="bg-black text-white py-5 text-center font-bold">
        Logo Maker <div className="inline-block items-center">
          🎨
        </div>
      </div>

      <div className='mt-3 mx-5 lg:mx-80 bg-indigo-200 text-center p-4 rounded'>
        <div className='text-black text-xs'>*The letters are draggable
        </div>
        <div ref={targetElementRef}>
          <div className='text-white flex justify-center items-center flex-wrap' style={{ fontSize: `${size}px`, height: '150px' }} >
            {textItems.map((text, index) =>
            (
              <Draggable key={index}>
                <div dangerouslySetInnerHTML={{ __html: text == ' ' ? '&nbsp;' : text }} className={`${color} mt-3 char`} style={{ cursor: 'move', fontWeight: 'bold' }} ref={(el) => (textRef.current[index] = el)} />
              </Draggable>
            )
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        <div className="relative w-72">
          <input id="text-input" type="text" className="w-full transition-colors duration-800 bg-slate-100 border border-slate-300 px-2 py-1 rounded focus:border-slate-400 focus:outline-0" placeholder="Type your text logo here" value={text} onChange={(e) => setText(e.target.value)} />
          <div id="progress-icon" className="h-full flex items-center absolute top-0 right-4">
            <div className={`w-2 h-2 bg-indigo-500 rounded-full ${change && 'animate-ping'}`}></div>
          </div>
        </div>
      </div>


      <div className='flex justify-center mt-10'>
        <div className="flex mb-8 w-72">
          <label>Size :&nbsp;</label>
          <input id="size-input" className="flex-1" type="range" min="8" max="72" value={size} onChange={(e) => setSize(e.target.value)} />
          <span id="size-text">&nbsp; {size}px</span>
        </div>
      </div>

      <div className='flex justify-center mt-2'>
        <button className={`bg-yellow-500 p-5 rounded-full mr-3 ${color == 'text-yellow-500' ? 'border-4 border-blue-500' : 'border-4'}`} onClick={() => { setColor("text-yellow-500") }}></button>
        <button className={`bg-red-500 p-5 rounded-full mr-3 ${color == 'text-red-500' ? 'border-4 border-blue-500' : 'border-4'}`} onClick={() => { setColor("text-red-500") }}></button>
        <button className={`bg-purple-500 p-5 rounded-full mr-3 ${color == 'text-purple-500' ? 'border-4 border-blue-500' : 'border-4'}`} onClick={() => { setColor("text-purple-500") }}></button>
        <button className={`bg-sky-500 p-5 rounded-full mr-3 ${color == 'text-sky-500' ? 'border-4 border-blue-500' : 'border-4'}`} onClick={() => { setColor("text-sky-500") }}></button>
        <button className={`bg-cyan-500 p-5 rounded-full mr-3 ${color == 'text-cyan-500' ? 'border-4 border-blue-500' : 'border-4'}`} onClick={() => { setColor("text-cyan-500") }}></button>
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} img={image} />


      <div className="flex justify-center mt-10">
        <button onClick={handleCaptureClick} className="border-blue-800 bg-blue-500 text-white px-4 py-1 border-b-4 rounded hover:bg-blue-400 transition-colors flex items-center justify-center font-bold">
          <div className="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          &nbsp;Generate

        </button>
      </div>




    </div>
  )
}

export default App
