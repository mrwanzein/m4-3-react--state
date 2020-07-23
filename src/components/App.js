import React from 'react';

import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

import booksData from '../data';
import Typeahead from './Typeahead';

const Wrapper = styled.div`
    width: 30%;
    margin: 40px auto 10px auto;
`;

const App = (props) => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Typeahead
        suggestions={booksData.books}
        categories={booksData.categories}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
      />
    </Wrapper>
  );
};

export default App;
