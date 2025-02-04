import {StyledButtonLarge, StyledSearchForm} from "./app-styled-components.jsx";
import InputWithLabel from "./input-with-label.jsx";

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => {
    return (
        <StyledSearchForm onSubmit={onSearchSubmit} >
            <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
                <strong>Search:</strong>
            </InputWithLabel>
            &nbsp;
            <StyledButtonLarge type="submit" disabled={!searchTerm} >
                Submit
            </StyledButtonLarge>
        </StyledSearchForm>
    );
};

export default SearchForm;