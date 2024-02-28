import styled from '@emotion/styled'

export const Root = styled.ol`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

export const Track = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`

export const Content = styled.span`
  display: flex;
  align-items: center;
`

export const TitleBadge = styled.span`
  margin-left: ${({ theme }) => theme.spacing(0.5)};
  padding: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.5)};

  border: 1px solid ${({ theme }) => theme.vars.palette.success.main};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1;

  color: ${({ theme }) => theme.vars.palette.success.main};

  &::before {
    content: 'title';
  }
`

export const ExplicitBadge = styled.span`
  margin-left: ${({ theme }) => theme.spacing(0.5)};
  padding: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.5)};

  border: 1px solid ${({ theme }) => theme.vars.palette.error.main};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1;

  color: ${({ theme }) => theme.vars.palette.error.main};

  &::before {
    content: 'explicit';
  }
`
