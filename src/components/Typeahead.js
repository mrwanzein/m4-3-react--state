import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 300px;
    height: 30px;
    outline-color: lightblue;
`;

const ClearBtn = styled.button`
    width: 80px;
    height: 30px; 
    background-color: darkblue;
    color: white;
    margin-left: 10px;
`;

const SuggestionsBox = styled.div`
    margin-top: 12px;
    box-shadow: 0px 5px 13px -8px rgba(0,0,0,0.75);
    width: 390px;
`;

const Suggestion = styled.li`
    padding: 5px;
    margin: 5px;
`;

const Prediction = styled.span`
    font-weight: bold;
`;

const BookGenre = styled.span`
    color: orchid;
`;

const searchBooks = (bookList, inputValue, handleSelect, categories, selectedState, setSelectedSuggestionIndex) => {
    return bookList.filter(books => books.title.toLowerCase().includes(inputValue.toLowerCase()))
    .map((books, index) => {
        let untilKeyword = books.title.slice(0, books.title.toLowerCase().indexOf(inputValue) + inputValue.length);
        let afterKeyword = books.title.slice(books.title.toLowerCase().indexOf(inputValue) + inputValue.length);

        return (

            <Suggestion 
            key={books.id}
            onClick={() => handleSelect(books.title)}
            onMouseEnter={() => setSelectedSuggestionIndex(index)}
            style={{background: selectedState === index ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent'}}
            className={`bookSearchList ${selectedState === index ? 'highlighted' : ''}`}
            >
                {untilKeyword}
                <Prediction>{afterKeyword}</Prediction>
                <i> in </i>
                <BookGenre>{categories[books.categoryId].name}</BookGenre>
            </Suggestion>
        );
    })
}

const Typeahead = ({suggestions, handleSelect, categories}) => {
    const [book, setBook] = React.useState("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(0);

    if(selectedSuggestionIndex < 0){
        setSelectedSuggestionIndex(document.getElementsByClassName('bookSearchList').length - 1);
    } else if(selectedSuggestionIndex > document.getElementsByClassName('bookSearchList').length) {
        setSelectedSuggestionIndex(0)
    }

    return (
        <div>
            <SearchInput 
                type="text"
                placeholder="Search book"
                value={book}
                onChange={(ev) => {
                    setBook(ev.target.value);
                }}

                onKeyDown={(ev) => {
                    switch (ev.key) {
                        case "Enter": {
                            handleSelect(document.getElementsByClassName('highlighted')[0].textContent);
                            return;
                        }
                        case "ArrowUp": {
                                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                            return;
                        }
                        case "ArrowDown": {
                                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                            return;
                        }
                        default:
                    }
                }}
            />
            <ClearBtn onClick={() => setBook('')}>Clear</ClearBtn>
            <SuggestionsBox>
                <ul>
                    {book.length > 2 && searchBooks(suggestions, book, handleSelect, categories, selectedSuggestionIndex, setSelectedSuggestionIndex)}
                </ul>
            </SuggestionsBox>
        </div>
    );
}

export default Typeahead;