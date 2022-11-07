import styled from 'styled-components'

const Main = styled('div')`
  & .control-btn {
    color: ${(props) => props.color};
  }
`

export { Main }
