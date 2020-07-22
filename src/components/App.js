import React from 'react';

import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

import booksData from '../data';
import Typeahead from './Typeahead';

const Wrapper = styled.div`
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const App = (props) => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Typeahead
        suggestions={booksData.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
      />
    </Wrapper>
  );
};

export default App;
