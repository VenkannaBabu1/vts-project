import React, { useState } from 'react';

const Accordion = () => {
    const [insuranceData, setInsuranceData] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null);

    const motorData = [
        {
            id: 1,
            question: "Can a duplicate Policy Be obtained?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            question: "What is lorem ipsum?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    const healthData = [
        {
            id: 1,
            question: "What does health insurance cover?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            question: "How to claim health insurance?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    const shopkeeperData = [
        {
            id: 1,
            question: "What is covered under shopkeeper insurance?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            question: "How to renew shopkeeper insurance?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    const accidentData = [
        {
            id: 1,
            question: "What does personal accident insurance cover?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            question: "How to file a claim for personal accident insurance?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
                <div className={`cursor-pointer border p-4 rounded transition duration-300 ease-in-out hover:text-orange-500 hover:border-orange-500 ${insuranceData === accidentData ? 'text-orange-500 border-orange-500' : ''}`} onClick={() => handleInsuranceClick(accidentData)}>
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
