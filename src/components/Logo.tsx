import { CSSProperties, FC } from 'react'

interface ILogo {
  style?: CSSProperties
}

const Logo: FC<ILogo> = ({ style }) => (
  <img src="/logo.png" alt="Code Memoria - Logo" style={style} />
)

export default Logo
