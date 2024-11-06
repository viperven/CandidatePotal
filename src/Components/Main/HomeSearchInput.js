import React, { useEffect, useRef, useState } from 'react';
import { AdvanceSearchService } from '../../Services/AdvanceSearchService';
import { ReactTyped } from 'react-typed';
// import { CommonDropDownService } from '../../../../Services/RecruiterServices/CommonDropDownService';


const HomeSearchInput = ({ options, setOptions, selectedOptions, setSelectedOptions, toggleStar, handleSubmit, handlejobSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
        if (e.target.value) {
            initKeyWordsList(e.target.value);
        }
        // setCandidateResumeDetail(prev => ({
        //     ...prev,
        //     ["jobTitle"]: e.target.value,
        // }))
    };


    //for dropdown suggestion
    const initKeyWordsList = async (inputText) => {
        try {
            const keyWords = await AdvanceSearchService.GetKeyWords(inputText);

            // Check if apiData exists and is valid JSON
            let parsedKeywords = keyWords?.apiData ? JSON.parse(keyWords.apiData) : [];

            // Ensure parsedKeywords is an array
            if (!Array.isArray(parsedKeywords)) {
                parsedKeywords = [];
            }

            // Slice and format if there are keywords
            const formattedKeywords = parsedKeywords.slice(0, 10)?.map(keyword => ({
                value: keyword.KeyWordID,
                label: keyword.KeyWord
            }));     
            setOptions(formattedKeywords);
        } catch (error) {
            console.error("Error fetching keywords:", error);
            setOptions([]); // Fallback to empty options in case of error
        }
    };


    //suggestion click if duplicate dont append
    const handleSuggestionClick = (option) => {
        if (!selectedOptions.some(opt => opt.value === option.value)) {
            setSelectedOptions([...selectedOptions, option]);
            setInputValue(option?.label);
        }
        setShowSuggestions(false);
    };


    //fires event on keydown 
    const handleKeyDown = (e) => {

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prevIndex => (prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedOptions) {
                handlejobSearch()
            }
            if (inputValue === "") {
                handleSubmit(selectedOptions);
            }
            if (highlightedIndex >= 0 && options[highlightedIndex]) {
                handleSuggestionClick(options[highlightedIndex]);
                handlejobSearch()
            }               
            else if (inputValue.trim()) {
                const newOption = { value: inputValue, label: inputValue };
                if (!selectedOptions.some(opt => opt.value === inputValue)) {
                    setSelectedOptions([...selectedOptions, newOption]);
                }
                // setInputValue('');
            }
            setShowSuggestions(false);
        }
    };

    //when click outside make pill if any letter present
    const handleBlur = () => {
        if (inputValue.trim()) {
            const newOption = { value: inputValue, label: inputValue };
            if (!selectedOptions.some(opt => opt.value === inputValue)) {
                setSelectedOptions([...selectedOptions, newOption]);
                setInputValue(newOption?.label);
            }
        }

        setShowSuggestions(false);
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            const highlightedElement = document.querySelector(`.suggestion-item-${highlightedIndex}`);
            if (highlightedElement) {
                highlightedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [highlightedIndex]);




    return (
        <div className="search-input" onBlur={handleBlur} style={{ border: "none", width:"80%" }} >
            {showSuggestions && options.length > 0 && (

                <div className="suggestions-dropdown" style={{ textAlign: "left" }}>
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            className={`suggestion-item suggestion-item-${index} ${index === highlightedIndex ? 'highlighted' : ''}`}
                            onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
                            onClick={() => handleSuggestionClick(option)} // Handle mouse click selection
                        >
                            <span style={{ marginLeft: "10px" }}>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
            <ReactTyped
                strings={[
                    "Search for Driver Jobs...",
                    "Search for Plumber Jobs...",
                    "Search for Welder Jobs...",
                    "Search for Fitter Jobs...",
                    "Search for Rigger Jobs...",
                    // "Search for Construction Jobs",
                ]}
                typeSpeed={40}
                backSpeed={10}
                attr="placeholder"
                loop
                style={{minWidth:"100%"}}
            >
            <input
                id='myinput'
                type="text"
                value={inputValue}
                onChange={handleInputChange} //fires dropdown suggestion
                onKeyDown={handleKeyDown}   //fires on key event like down,top arrow and enter
                className="custom-input"
                onFocus={() => setShowSuggestions(true)} // shows suggestion on focus
                placeholder='Enter Your Designation Ex : Plumber'
                style={{ border: "none",minWidth:"100%" }}
                autocomplete="off"
            />
            </ReactTyped>
        </div>
    );
};

export default HomeSearchInput;