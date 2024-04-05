import styled from '@emotion/styled'

export const Root = styled.pre`
  margin: ${({ theme }) => theme.spacing(2, -4)};

  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  position: relative;

  overflow-x: auto;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: ${({ theme }) => theme.spacing(2, 0)};
  }

  &:before {
    content: attr(data-language);

    padding: ${({ theme }) => theme.spacing(0.25, 0.75)};
    border-bottom-left-radius: ${({ theme }) => theme.shape.borderRadius}px;

    position: absolute;
    top: 0;
    right: 0;

    font-size: 0.75em;

    background-color: rgba(255, 255, 255, 0.125);
  }
`
