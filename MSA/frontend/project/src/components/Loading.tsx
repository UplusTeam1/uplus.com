// styles
import styled from 'styled-components'
import { flexCenter } from '../styles/basicStyles'
import { CircularProgress } from '@mui/material'

const LoadingDiv = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
`

function Loading() {
  return (
    <LoadingDiv>
      <CircularProgress color="primary" />
    </LoadingDiv>
  )
}

export default Loading
