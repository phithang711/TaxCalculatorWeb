import styled from 'styled-components'

export const Title = styled.h3`
  font-size: 3em;
  text-align: center;
`

export const DefaultText = styled.p`
  font-size: 1.5em;
`

export const Input = styled.input.attrs<{ $size?: string }>((props) => ({
  type: 'text',
  $size: props.$size || '1em'
}))`
  border: 2px solid gray;
  margin: ${(props) => props.$size};
  padding: ${(props) => props.$size};
`

export const Page = styled.div`
  align-content: center;
  align-items: center;
  justify-content: center;
  background: lightgray;
  display: flex;
`
