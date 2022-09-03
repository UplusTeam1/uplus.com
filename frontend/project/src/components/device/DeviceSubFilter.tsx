import styled from 'styled-components'
// import interface
import { DeviceFilterType } from '../../modules/device'
import { MakerType, MAKER_LIST } from '../../data/staticData'
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

// interface
interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

interface DeviceSubFilterProps {
  deviceFilter: DeviceFilterType
  handleDeviceFilter: (
    value: number | string | Array<number> | boolean,
    key: string
  ) => void
}

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

function DeviceSubFilter(props: DeviceSubFilterProps) {
  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      props.handleDeviceFilter(
        [
          Math.min(newValue[0], props.deviceFilter.price[1] - minDistance),
          props.deviceFilter.price[1],
        ],
        'price'
      )
    } else {
      props.handleDeviceFilter(
        [
          props.deviceFilter.price[0],
          Math.max(newValue[1], props.deviceFilter.price[0] + minDistance),
        ],
        'price'
      )
    }
  }

  return (
    <FilterContainer>
      <ToggleButtonGroup
        color="primary"
        value={props.deviceFilter.maker}
        exclusive
        onChange={(e, newAlignment: string) => {
          if (newAlignment !== null) {
            props.handleDeviceFilter(newAlignment, 'maker')
          }
        }}
        aria-label="Maker"
      >
        {MAKER_LIST.map(({ label, value }: MakerType, index: number) => (
          <ToggleButton key={index} value={value}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <RightFilter>
        <SoldOutButton
          onClick={() =>
            props.handleDeviceFilter(!props.deviceFilter.stock, 'stock')
          }
        >
          <CheckCircleOutlineIcon
            color={props.deviceFilter.stock ? 'primary' : 'secondary'}
          />
          <SoldOutText>품절상품 제외</SoldOutText>
        </SoldOutButton>
        <SliderFilter>
          <AirbnbSlider
            components={{ Thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            value={props.deviceFilter.price}
            onChange={handleSliderChange}
            max={300000}
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
              value={String(props.deviceFilter.sortIndex)}
              onChange={(e) =>
                props.handleDeviceFilter(Number(e.target.value), 'sortIndex')
              }
              label="Sort"
            >
              <MenuItem value={0}>실 구매가가 낮은 상품 순</MenuItem>
              <MenuItem value={1}>정상가가 낮은 순</MenuItem>
              <MenuItem value={2}>정상가가 높은 순</MenuItem>
            </Select>
          </FormControl>
        </SortSelect>
      </RightFilter>
    </FilterContainer>
  )
}

export default DeviceSubFilter
