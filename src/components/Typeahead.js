import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 300px;
    height: 30px;
`;

const ClearBtn = styled.button`
    width: 80px;
    height: 30px; 
    background-color: darkblue;
    color: white;
    margin-left: 10px;
`;

const Typeahead = ({suggestions, handleSelect}) => {
    const [book, setBook] = React.useState("");
    
    return (
        <>
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
        </>
    );
}

export default Typeahead;