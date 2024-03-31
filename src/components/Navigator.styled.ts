import styled from '@emotion/styled'
import { Theme, keyframes } from '@emotion/react'
import Link from 'next/link'

const ItemInterpolation = ({ theme }: { theme: Theme }) => `
  padding: ${theme.spacing(0.75, 1)};
  border-radius: ${theme.shape.borderRadius * 2}px;

  display: flex;
  align-items: center;

  color: ${theme.vars.palette.text.primary};
  text-decoration: none;
  
  transition: ${theme.transitions.create(['background-color'])};
  
  > span {
    margin-right: ${theme.spacing(1)};
  }
  
  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const Item = styled(Link)`
  ${({ theme }) => ItemInterpolation({ theme })}

  &:hover,
  &:focus-visible {
    ${({ theme }) => theme.getColorSchemeSelector('dark')} {
      background-color: rgba(255, 255, 255, 0.1);
    }

    ${({ theme }) => theme.getColorSchemeSelector('light')} {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`

export const SelectedItem = styled.div`
  ${({ theme }) => ItemInterpolation({ theme })}
  font-weight: 700;

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const RootAppearance = keyframes`
  from {
    transform: translateY(100%) translateY(8px);
  }
  
  to {
    transform: translateY(100%);
  }
`

const BackdropAppearance = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;

  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ theme }) => theme.spacing(-1)};

  z-index: ${({ theme }) => theme.zIndex.appBar + 2};

  transform: translateY(100%);

  background-color: ${({ theme }) =>
    `rgba(${theme.vars.palette.background.defaultChannel} / 0.5)`};

  box-shadow: ${({ theme }) => theme.shadows[16]};
  animation: ${RootAppearance}
    ${({ theme }) => theme.transitions.duration.standard}ms
    ${({ theme }) => theme.transitions.easing.easeOut} forwards;

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    border: 1px solid rgba(80, 80, 80, 1);
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    border: 1px solid ${({ theme }) => theme.palette.divider};
  }

  &::before {
    content: '';

    width: calc(100% - 2px);
    height: calc(100% - 2px);

    position: absolute;
    top: 1px;
    left: 1px;

    z-index: -1;

    backdrop-filter: blur(20px) saturate(2.5);
    animation: ${BackdropAppearance}
      ${({ theme }) => theme.transitions.duration.standard}ms
      ${({ theme }) => theme.transitions.easing.easeOut} forwards;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: ${({ theme }) => theme.spacing(0)};
    padding: ${({ theme }) => theme.spacing(1)};
  }
`

export const Spacer = styled.div`
  flex: 1 1 auto;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: ${({ theme }) => theme.zIndex.appBar + 1};
`
