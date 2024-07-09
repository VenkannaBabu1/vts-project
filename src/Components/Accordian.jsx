import React, { useState } from 'react';

const Accordion = () => {
    const [insuranceData, setInsuranceData] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null);

    const motorData = [
        {
            id: 1,
            question: "Can a duplicate Policy Be obtained?",
            answer: "Yes, please approach the same office which has issued the policy, with a written request . A nominal fee is charged for issuing duplicate policy copy."
        },
        {
            id: 2,
            question: "Where I can renew my Policy?",
            answer: "Existing insurance will be renewed by the same office. Please contact the office concerned for exact premium and pay it to the same office. Do not send your premium to any other office or to the Regional Office/Head Office. You can also log on to our portal and register yourself as our customer and renew package policies of private cars and two wheelers from our portal itself."
        },
        {
            id: 3,
            question: "Where can I  transfer my insurance to the purchaser of my vehicle?",
            answer: "Yes, the insurance can be transferred to the buyer of the vehicle, provided the seller gives in writing to the insurance company. A fresh proposal form needs to be filled in. There is a nominal fee charged for transfer of insurance. Please contact the concerned insurance office for guidance and terms and conditions."
        }
    ];

    const healthData = [
        {
            id: 1,
            question: "What is the cancellation Policy?",
            answer: "Cancellation on the request of Insured or by the Company after giving 30 days."
        },
        {
            id: 2,
            question: "What is Co-Payment ?",
            answer: <><li>10% of each claim as Co-payment only in Silver plan</li>
            <li>20% compulsory co-payment in cases where Entry Age is above 65 years</li></>
        }
    ];

    const shopkeeperData = [
        {
            id: 1,
            question: "What is covered under shopkeeper insurance?",
            answer: <><li>
            Fire Loss to the Contents (Stock in Trade & FFF). Perils as per Standard Fire & Special Perils Policy including Earthquake.</li>
            <li>House Breaking Loss/damage to contents (excluding Money and Valuables) by Housebreaking excluding where any partner or any employee of the insured or member of the insured family is concerned as principal or accessory.</li></>
        },
        {
            id: 2,
            question: "How to lodge claim?",
            answer: <>
            <li>Please ensure that no bribe is given to anyone on account of settlement of claim. Please report any such demand immediately to the Company.</li>
            <li>Take necessary steps to minimize loss and keep the Insurance Company apprised.</li></>
        }
    ];

    const accidentData = [
        {
            id: 1,
            question: "Is there any discount for getting family cover",
            answer: "Yes, depending upon the number of persons covered, family discount is granted.."
        },
        {
            id: 2,
            question: "What is Personal Accident Insurance?",
            answer: "Personal Accident is an insurance cover wherein, in the event of the person sustaining bodily injuries resulting solely and directly from an accident caused by EXTERNAL, VIOLENT & VISIBLE means , resulting into death or disablement.."
        }
    ];

    const handleInsuranceClick = (data) => {
        if (insuranceData === data) {
            setInsuranceData(null);
            setActiveQuestion(null);
        } else {
            setInsuranceData(data);
            setActiveQuestion(null);
        }
    };

    const handleQuestionClick = (id) => {
        setActiveQuestion(id === activeQuestion ? null : id);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="text-center">
                <h1 className='text-3xl font-bold'>Got questions? We'd love to answer</h1>
            </div>
            <div className="flex flex-row gap-4 justify-center mt-6">
                <div className={`cursor-pointer border p-4 rounded transition duration-300 ease-in-out hover:text-orange-500 hover:border-orange-500 ${insuranceData === motorData ? 'text-orange-500 border-orange-500' : ''}`} onClick={() => handleInsuranceClick(motorData)}>
                    <h1 className="text-xl font-semibold">Motor Insurance</h1>
                </div>
                <div className={`cursor-pointer border p-4 rounded transition duration-300 ease-in-out hover:text-orange-500 hover:border-orange-500 ${insuranceData === healthData ? 'text-orange-500 border-orange-500' : ''}`} onClick={() => handleInsuranceClick(healthData)}>
                    <h1 className="text-xl font-semibold">Health Insurance</h1>
                </div>
                <div className={`cursor-pointer border p-4 rounded transition duration-300 ease-in-out hover:text-orange-500 hover:border-orange-500 ${insuranceData === shopkeeperData ? 'text-orange-500 border-orange-500' : ''}`} onClick={() => handleInsuranceClick(shopkeeperData)}>
                    <h1 className="text-xl font-semibold">Shopkeeper Insurance</h1>
                </div>
                <div className={`cursor-pointer border p-4 rounded transition duration-300 ease-in-out  hover:text-orange-500 hover:border-orange-500 ${insuranceData === accidentData ? 'text-orange-500 border-orange-500' : ''}`} onClick={() => handleInsuranceClick(accidentData)}>
                    <h1 className="text-xl font-semibold">Personal Accident Insurance</h1>
                </div>
            </div>
            <div className="mt-6">
                {insuranceData && (
                    insuranceData.map((item) => (
                        <div key={item.id} className="border-b py-4">
                            <div className="cursor-pointer flex justify-between items-center" onClick={() => handleQuestionClick(item.id)}>
                                <h1 className={`text-lg font-semibold ${activeQuestion === item.id ? 'text-orange-500' : ''}`}>{item.question}</h1>
                                <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {activeQuestion === item.id ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    )}
                                </svg>
                            </div>
                            {activeQuestion === item.id && (
                                <div className="mt-2">
                                    <p className="text-md">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Accordion;
