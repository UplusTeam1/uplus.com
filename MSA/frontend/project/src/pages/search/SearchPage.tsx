import produce from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { DeviceData, getDevicePrice } from '../../api/device'
import DeviceCompareDialog from '../../components/device/DeviceCompareDialog'
import DeviceCompareTab from '../../components/device/DeviceCompareTab'
import DeviceItem from '../../components/device/DeviceItem'
import SearchTextButton from '../../components/search/SearchTextButton'
import useCompareDeviceList from '../../hooks/device/useCompareDeviceList'
import useDeviceList from '../../hooks/device/useDeviceList'
import { CompareDevice } from '../../modules/device'
import { flexCenter } from '../../styles/basicStyles'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from 'react-query'
import useCalculatedPrice from '../../hooks/device/useCalculatedPrice'
import { AxiosError } from 'axios'
import { SearchDevice, searchDevice, SearchDeviceList } from '../../api/search'
import { useNavigate, useParams } from 'react-router-dom'

const SearchRelationContainer = styled.div`
  flex-wrap: wrap;
  ${flexCenter}
  width: 1228px;
  margin-bottom: 50px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchCountContainer = styled.div`
  ${flexCenter}
  width: 1228px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchCountSpan = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.app.uplusPink};
`
const SearchRelationSpan = styled.span`
  margin-right: 50px;
`
const SearchNoResultContainer = styled.div`
  ${flexCenter}
  width: 1228px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchNoResultSpan = styled.span`
  color: ${({ theme }) => theme.app.uplusPink};
`
const SearchRecommendedContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 1228px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.app.blackFont};
`
const SearchRelationTextContainer = styled.div`
  ${flexCenter}
  margin-top: 20px;
  width: 1228px;
`
const SearchRecommendedTextContainer = styled.div`
  ${flexCenter}
  width: 1228px;
`
const SearchRecommendedButtonContainer = styled.div`
  flex-wrap: wrap;
  ${flexCenter}
  width: 1228px;
  margin-bottom: 10px;
  margin-top: 10px;
`
const SearchTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: 1228px;
`
const SearchListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1228px;
  & > div:nth-child(4n) {
    margin-right: 0;
  }
`
const SearchTextButtonDiv = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`
export type SearchParams = {
  keyword: string
}
function SearchPage() {
  const [isOpenCompareTab, setIsOpenCompareTab] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { compareDeviceList, setCompareDeviceList, resetCompareDeviceList } =
    useCompareDeviceList()
  const params = useParams<keyof SearchParams>() as SearchParams
  const navigate = useNavigate()
  const priceMutation = useMutation(getDevicePrice)
  const { calculatePrice } = useCalculatedPrice()
  const theme = useTheme()
  const searchList = useQuery<SearchDeviceList, AxiosError>(
    ['searchList', params.keyword],
    () => searchDevice(params.keyword)
  )
  const selectedCompareDeviceCode = useMemo(
    () =>
      compareDeviceList
        ? compareDeviceList.map((device) => device.deviceCode)
        : [''],
    [compareDeviceList]
  )

  useEffect(() => {
    if (compareDeviceList[0].discountIndex !== 4) {
      setIsOpenCompareTab(true)
    }
  }, [])

  const clickCompareButton = useCallback(() => {
    setIsOpenCompareTab(true)
  }, [])

  const closeCompareTab = useCallback(() => {
    setIsOpenCompareTab(false)
    resetCompareDeviceList()
  }, [])

  const clickOpenDialog = useCallback(() => {
    if (compareDeviceList[1].discountIndex !== 4) {
      setOpenDialog(true)
    } else {
      Swal.fire({
        text: '2??? ????????? ????????? ??????????????? ??????????????? ???????????????.',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      })
    }
  }, [compareDeviceList])
  const closeDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const addCompareDevice = (compareDevice: CompareDevice) => {
    clickCompareButton()
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].discountIndex === 4) {
        setCompareDeviceList(
          produce(compareDeviceList, (draft) => {
            draft[i] = compareDevice
          })
        )
        if (i === 2) {
          setOpenDialog(true)
        }
        return
      }
    }
    Swal.fire({
      text: '?????? 3??? ???????????? ??????????????? ???????????????.',
      icon: 'warning',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    })
  }

  const changeCompareDeviceOption = (compareDevice: CompareDevice) => {
    for (let i = 0; i < 3; i++) {
      if (compareDeviceList[i].deviceCode === compareDevice.deviceCode) {
        priceMutation.mutate(
          {
            deviceCode: compareDevice.deviceCode,
            planName: compareDevice.planName,
          },
          {
            onSuccess: (devicePrice) => {
              setCompareDeviceList(
                produce(compareDeviceList, (draft) => {
                  draft[i] = {
                    ...compareDevice,
                    calculatedPrice: calculatePrice(
                      devicePrice,
                      compareDevice.discountIndex,
                      compareDevice.installmentIndex
                    ),
                  }
                })
              )
            },
            onError: (e) => {
              console.error(e)
            },
          }
        )
        break
      }
    }
  }

  const deleteCompareDevice = (deviceCode: string) => {
    const _compareDeviceList = [...compareDeviceList].filter(
      (device) => device.deviceCode !== deviceCode
    )
    _compareDeviceList.push({
      deviceCode: '',
      deviceName: '',
      joinTypeIndex: 0,
      installmentIndex: 0,
      discountIndex: 4,
      planName: '',
      picPath: '',
      calculatedPrice: null,
      color: [''],
      storage: 0,
    })
    setCompareDeviceList(_compareDeviceList)
  }

  return (
    <>
      <SearchTopContainer>
        {searchList.data?.length === 0 ? (
          <>
            <SearchRecommendedContainer>
              <SearchRecommendedTextContainer>
                U+ ?????? ???????????? ????????? ?????????!
              </SearchRecommendedTextContainer>
              <SearchRecommendedButtonContainer>
                {[
                  '????????? S22',
                  '????????? ?????? 20',
                  '????????? S21',
                  'iPhone 13',
                  'iPhone 13 Pro',
                  'iPhone 12',
                ].map((recommendText) => (
                  <SearchTextButtonDiv>
                    <SearchTextButton
                      width="auto"
                      minWidth="70px"
                      paddingLeft="10px"
                      paddingRight="10px"
                      height="35px"
                      size="14px"
                      fontColor={theme.app.grayFont}
                      bgColor={theme.app.whiteFont}
                      border={`1px solid ${theme.app.grayFont}`}
                      text={recommendText}
                      onClick={() => navigate(`/search/${recommendText}`)}
                    />
                  </SearchTextButtonDiv>
                ))}
              </SearchRecommendedButtonContainer>
            </SearchRecommendedContainer>
            <SearchNoResultContainer>
              <SearchNoResultSpan>'{params.keyword}'</SearchNoResultSpan> ???
              ?????? ??????????????? ????????????!
            </SearchNoResultContainer>
          </>
        ) : (
          <>
            <SearchRelationContainer>
              <SearchRelationTextContainer>
                ???????????????
              </SearchRelationTextContainer>
              {searchList.data?.slice(0, 6).map((searchDevice) => (
                <SearchTextButtonDiv>
                  <SearchTextButton
                    width="auto"
                    minWidth="70px"
                    paddingLeft="10px"
                    paddingRight="10px"
                    height="35px"
                    size="14px"
                    fontColor={theme.app.grayFont}
                    bgColor={theme.app.whiteFont}
                    border={`1px solid ${theme.app.grayFont}`}
                    text={searchDevice.name}
                    onClick={() => navigate(`/search/${searchDevice.name}`)}
                  />
                </SearchTextButtonDiv>
              ))}
            </SearchRelationContainer>
            <SearchCountContainer>
              <SearchCountSpan>'{params.keyword}'</SearchCountSpan>
              <span> ??? ?????? ??????????????? ??? </span>
              <SearchCountSpan>{searchList.data?.length}</SearchCountSpan>???
              ?????????!!
            </SearchCountContainer>
          </>
        )}
      </SearchTopContainer>
      {isOpenCompareTab && (
        <DeviceCompareTab
          closeCompareTab={closeCompareTab}
          clickOpenDialog={clickOpenDialog}
          compareDeviceList={compareDeviceList}
          deleteCompareDevice={deleteCompareDevice}
          resetCompareDeviceList={resetCompareDeviceList}
        />
      )}
      <SearchListContainer>
        {searchList.data &&
          searchList.data.map((device: SearchDevice, index: number) => (
            <DeviceItem
              key={index}
              device={device}
              planFilter={'5G ??????+'}
              discountIndex={device.recommendedDiscountIndex}
              installmentIndex={2}
              addCompareDevice={addCompareDevice}
              deleteCompareDevice={deleteCompareDevice}
              selectedCheck={selectedCompareDeviceCode.includes(device.code)}
            />
          ))}
      </SearchListContainer>
      <DeviceCompareDialog
        open={openDialog}
        onClose={closeDialog}
        compareDeviceList={compareDeviceList}
        changeCompareDeviceOption={changeCompareDeviceOption}
        deleteCompareDevice={deleteCompareDevice}
      />
    </>
  )
}

export default SearchPage
