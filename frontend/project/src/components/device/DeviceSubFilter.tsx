import { useState } from 'react'
import styled from 'styled-components'
// import components
import {
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import { SliderThumb } from '@mui/material/Slider'
import { SelectChangeEvent } from '@mui/material/Select'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// styled
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1230px;
  height: 110px;
`
const RightFilter = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-start;
  height: 110px;
`
const SoldOutButton = styled.div`
  display: flex;
  align-items: center;
  padding-top: 50px;
  cursor: pointer;
`
const SoldOutText = styled.div`
  font-size: 19px;
  margin-left: 4px;
`
const SliderFilter = styled.div`
  width: 250px;
  padding-top: 50px;
  margin: 0 40px;
`
const SortSelect = styled.div`
  display: flex;
  justify-content: end;
  width: 220px;
  padding-top: 40px;
`
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: theme.app.uplusPink,
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-valueLabel': {
    fontSize: 16,
    fontWeight: 'normal',
    top: 2,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}))

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

// components
function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}

function valueLabelFormat(value: number) {
  return `${value.toLocaleString('ko-KR')}`
}

const minDistance = 10000

function DeviceSubFilter() {
  const [alignment, setAlignment] = useState('전체')
  const makerList: any = [{ name: '전체' }, { name: '삼성' }, { name: '애플' }]
  const [isCheck, setIsCheck] = useState(true)
  const [sliderValue, setSliderValue] = useState([0, 200000])
  const [sortCategory, setSortCategory] = useState('0')

  const handleToggleChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }
  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - minDistance),
        sliderValue[1],
      ])
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + minDistance),
      ])
    }
  }
  const handleSortChange = (e: SelectChangeEvent) => {
    setSortCategory(e.target.value)
  }

  return (
    <FilterContainer>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Maker"
      >
        {makerList.map((maker: any) => (
          <ToggleButton value={maker.name}>{maker.name}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <RightFilter>
        <SoldOutButton onClick={() => setIsCheck(!isCheck)}>
          <CheckCircleOutlineIcon color={isCheck ? 'primary' : 'secondary'} />
          <SoldOutText>품절상품 제외</SoldOutText>
        </SoldOutButton>
        <SliderFilter>
          <AirbnbSlider
            components={{ Thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            value={sliderValue}
            onChange={handleSliderChange}
            max={200000}
            step={10000}
            valueLabelDisplay="on"
            valueLabelFormat={valueLabelFormat}
          />
        </SliderFilter>
        <SortSelect>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            fullWidth
          >
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortCategory}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value={0}>실 구매가가 낮은 상품 순</MenuItem>
              <MenuItem value={1}>정상가가 낮은 순</MenuItem>
              <MenuItem value={2}>정상가가 높은 순</MenuItem>
              <MenuItem value={3}>누적 판매량이 많은 순</MenuItem>
            </Select>
          </FormControl>
        </SortSelect>
      </RightFilter>
    </FilterContainer>
  )
}

export default DeviceSubFilter
