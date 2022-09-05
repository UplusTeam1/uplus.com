import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
  InputAdornment,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBarContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  margin-top: 60px;
  background-color: white;
  z-index: 10;
`

interface SearchBarProps {
  keyword: string
  autoCompletionList: Array<string>
  handleKeyPress: (key: string) => void
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
        freeSolo={true}
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
            onKeyPress={(e) => handleKeyPress(e.key)}
            color="primary"
            variant="standard"
          />
        )}
      />
      <IconButton
        sx={{ marginRight: '3px' }}
        aria-label="toggle password visibility"
        onClick={() => handleKeyPress('Enter')}
        edge="end"
      >
        <SearchIcon />
      </IconButton>
    </SearchBarContainer>
  )
}

export default SearchBar
