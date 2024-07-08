import React, { useEffect, useState } from 'react';
import { FaBus, FaCar, FaHome, FaMotorcycle, FaTruck } from "react-icons/fa";
import { MdLocalHospital, MdOutlineFlight } from "react-icons/md";
import { PiBankBold, PiFirstAidKitBold } from "react-icons/pi";
import House from "../assets/House.jpg";
import car from "../assets/car.jpg";
import health from "../assets/health.jpg";
import life from "../assets/life.jpeg";
import travel from "../assets/travel.jpg";
import ImageSlider from "./ImageSlider";
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Hero2 = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        setSelectedIcon("Motor"); 
    }, []);

    const getBackgroundImage = () => {
        switch (selectedIcon) {
            case 'Motor':
                return car;
            case 'Health':
                return health;
            case 'Travel':
                return travel;
            case 'Life':
                return life;
            case 'Home':
                return House;
            default:
                return car;
        }
    };

    function handleIcon(icon) {
        setSelectedIcon(icon);
    }

    const handleClick=()=>{
        navigate("/login")
    }

    return (
        <div className='h-screen'>
            <Navbar />
            <div className='p-10 h-full ' style={{ backgroundImage: `url(${getBackgroundImage()})`,backgroundRepeat:'no-repeat' }}>

                <div className='flex flex-row space-x-10 mt-10'>
                    <div className='header-1'>
                        <h1 className='text-4xl text-orange-500 '>VTS <br /><span className='text-blue-400'>Insurance</span></h1>
                    </div>
                    <div className="border-2 h-20 border-slate-100"></div>
                    <div className='header-2'>
                    <h1 className='text-3xl text-blue-600'>Aapka vishvaas, <br />
                            <span className='text-slate-700 '>hamari zimmedaari</span></h1>

                    </div>
                </div>

                <div className="container flex flex-row mt-10">
                    <div className="left ml-24">
                        <div className='icons flex flex-row space-x-10 ml-20 z-10 relative '>
                            <div className={`icon-1 bg-white p-4 border border-slate-400 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black hover:border-orange-600 duration-500 ${selectedIcon === 'Motor' ? 'bg-gray-200' : ''}`} onClick={() => handleIcon("Motor")}>
                                <FaMotorcycle className="inline-block mb-1 mr-2 text-xl" /> Motor
                            </div>
                            <div className={`icon-2 bg-white p-4 border rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black hover:border-orange-800 duration-500 ${selectedIcon === 'Health' ? 'bg-gray-200' : ''}`} onClick={() => handleIcon("Health")}>
                                <MdLocalHospital className="inline-block mb-1 mr-2 text-xl" /> Health
                            </div>
                            <div className={`icon-3 bg-white p-4 border rounded-lg px-5 border-slate-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black hover:border-orange-600 duration-500 ${selectedIcon === 'Life' ? 'bg-gray-200' : ''}`} onClick={() => handleIcon("Life")}>
                                <PiFirstAidKitBold className="inline-block mb-1 mr-2 text-xl" /> Life
                            </div>
                            <div className={`icon-4 bg-white p-4 border rounded-lg border-slate-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black hover:border-orange-600 duration-500 ${selectedIcon === 'Home' ? 'bg-gray-200' : ''}`} onClick={() => handleIcon("Home")}>
                                <FaHome className="inline-block mb-1 mr-2 text-xl" /> Home
                            </div>
                            <div className={`icon-5 bg-white p-4 border rounded-lg border-slate-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black hover:border-orange-600 duration-500 ${selectedIcon === 'Travel' ? 'bg-gray-200' : ''}`} onClick={() => handleIcon("Travel")}>
                                <MdOutlineFlight className="inline-block mb-1 mr-2 text-xl" /> Travel
                            </div>
                        </div>

                        <div className="message-container  w-full h-76 mt-4 p-6 z-20 relative rounded-2xl bg-white overflow-y-auto">
                            {selectedIcon === "Motor" && (
                                <>
                                    <header className='mb-3 font-bold text-lg'>{selectedIcon} Plans</header>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaCar className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> 2 Wheeler Policy</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaTruck className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> 4 Wheeler Policy</a>
                                        </div>
                                        <div className="policy3 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaBus className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Commercial Vehicles: Goods</a>
                                        </div>
                                        <div className="policy4 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaBus className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Commercial Vehicles: Passengers</a>
                                        </div>
                                    </div>
                                </>
                            )}
                            {selectedIcon === "Health" && (
                                <>
                                    <header className='mb-3 font-bold text-lg'>{selectedIcon} Plans</header>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdLocalHospital className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Super Health Top-Up</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Healthy Family</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdLocalHospital className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Super Health Top-Up</a>
                                        </div>
                                    </div>
                                </>
                            )}
                            {selectedIcon === "Life" && (
                                <>
                                    <header className='mb-3 font-bold text-lg'>{selectedIcon} Plans</header>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><PiFirstAidKitBold className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Whole Life Insurance</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><PiBankBold className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Term Life Insurance</a>
                                        </div>
                                       
                                    </div>
                                </>
                            )}
                            {selectedIcon === "Home" && (
                                <>
                                    <header className='mb-3 font-bold text-lg'>{selectedIcon} Plans</header>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaHome className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Swagruha Policy </a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaHome className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Home Shield </a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><FaHome className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Suraksha Policy </a>
                                        </div>
                                        
                                    </div>
                                </>
                            )}
                            {selectedIcon === "Travel" && (
                                <>
                                    <header className='mb-3 font-bold text-lg'>{selectedIcon} Plans</header>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> International Travel Insurance</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Domestic Travel Insurance</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/>Yatra Bima</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Durgatra Yatra Bima</a>
                                        </div>
                                        <div className="policy1 p-2 border rounded-lg border-slate-500 hover:bg-orange-600 hover:text-white">
                                            <a href=""><MdOutlineFlight className="inline-block mb-1 mr-2 text-xl"  onClick={handleClick}/> Yuva Yatra Bima</a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="right justify-center">
                        <div className="items-center ml-10 mt-[80px] h-[100px] w-[200px]">
                            <ImageSlider />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero2;
