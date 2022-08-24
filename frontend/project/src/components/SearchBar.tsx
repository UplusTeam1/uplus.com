import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
} from '@mui/material'

const SearchBarContainer = styled.div`
  position: absolute;
  margin-top: 60px;
  background-color: white;
`

interface SearchBarProps {
  searchList: any
}

function SearchBar({ searchList }: SearchBarProps) {
  const navigate = useNavigate()
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      navigate(`/device`)
    }
  }

  return (
    <SearchBarContainer>
      <Autocomplete
        id="search-bar"
        sx={{ width: 500 }}
        freeSolo
        options={searchList.map((option: any) => option.title)}
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
