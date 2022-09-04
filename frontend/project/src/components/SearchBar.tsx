import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
} from '@mui/material'

const SearchBarContainer = styled.div`
  position: fixed;
  margin-top: 60px;
  background-color: white;
  z-index: 10;
`

interface SearchBarProps {
  keyword: string
  autoCompletionList: Array<string>
  handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void
  handleChangeKeyword: (keyword: string) => void
}

function SearchBar({
  keyword,
  autoCompletionList,
  handleKeyPress,
  handleChangeKeyword,
}: SearchBarProps) {
  return (
    <SearchBarContainer>
      <Autocomplete
        id="search-bar"
        inputValue={keyword}
        onInputChange={(e, newInputValue) => {
          handleChangeKeyword(newInputValue)
        }}
        sx={{ width: 500 }}
        options={autoCompletionList.map(
          (autoCompletion: string) => autoCompletion
        )}
        filterOptions={(x) => x}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            fullWidth
            hiddenLabel
            onKeyPress={handleKeyPress}
            color="primary"
            variant="standard"
          />
        )}
      />
    </SearchBarContainer>
  )
}

export default SearchBar
