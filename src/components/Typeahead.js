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
    
    &:hover {
        background-color: lightyellow;
        cursor: pointer;
    }
`;

const searchBooks = (bookList, inputValue, handleSelect) => {
    return bookList.filter(books => books.title.toLowerCase().includes(inputValue.toLowerCase()))
    .map(books => <Suggestion key={books.id} onClick={() => handleSelect(books.title)}>{books.title}</Suggestion>)
}

const Typeahead = ({suggestions, handleSelect}) => {
    const [book, setBook] = React.useState("");
    
    return (
        <div>
            <SearchInput 
                type="text"
                placeholder="Search book"
                value={book}
                onChange={(ev) => {
                    setBook(ev.target.value);
                }}

                onKeyUp={(ev) => {
                    if(ev.key === 'Enter') {
                        handleSelect(book)
                    }
                }}
            />
            <ClearBtn onClick={() => setBook('')}>Clear</ClearBtn>
            <SuggestionsBox>
                <ul>
                    {book.length > 2 ? searchBooks(suggestions, book, handleSelect) : null}
                </ul>
            </SuggestionsBox>
        </div>
    );
}

export default Typeahead;