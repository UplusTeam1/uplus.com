import styled from 'styled-components'

const LogoImage = styled.img`
  padding-left: 20px;
  height: 40px;
  cursor: pointer;
`

interface UplusLogoProps {
  color: string
}

UplusLogo.defaultProps = {
  color: 'white',
}

function UplusLogo({ color }: UplusLogoProps) {
  return (
    <>
      {color === 'white' && (
        <LogoImage
          alt="Uplus Logo"
          src="/images/LG_U+_Logo_(white).png"
          onClick={() => null}
        />
      )}
      {color === 'black' && (
        <LogoImage
          alt="Uplus Logo"
          src="/images/LG_U+_Logo_(black).png"
          onClick={() => null}
        />
      )}
    </>
  )
}

export default UplusLogo
