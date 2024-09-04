import styled from '@emotion/styled'

export const STICKY_OFFSET = 2

interface Props {
  stick: boolean
}

export const Root = styled.nav<Props>`
  padding: ${({ theme }) => theme.spacing(1, 2)};

  margin-left: ${({ theme }) => theme.spacing(-2)};
  margin-right: ${({ theme }) => theme.spacing(-2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;

  position: sticky;

  z-index: ${({ theme }) => theme.zIndex.appBar};

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  background-color: ${({ theme }) =>
    `rgba(${theme.vars.palette.background.defaultChannel} / 0.5)`};
  box-shadow: ${({ theme, stick }) => (stick ? theme.shadows[16] : 'none')};

  transition: ${({ theme }) =>
    theme.transitions.create(['border-color', 'box-shadow', 'border-radius'])};

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    border: 1px solid
      ${({ stick }) => (stick ? 'rgba(80, 80, 80, 1)' : 'transparent')};
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    border: 1px solid
      ${({ theme, stick }) => (stick ? theme.palette.divider : 'transparent')};
  }

  .title {
    color: ${({ theme }) => theme.vars.palette.text.primary};
    text-decoration: none;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    top: ${({ theme }) => theme.spacing(STICKY_OFFSET)};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: ${({ theme }) => theme.spacing(-1)};
    margin-right: ${({ theme }) => theme.spacing(-1)};

    padding: ${({ theme }) => theme.spacing(1)};

    top: ${({ theme }) => theme.spacing(1)};
  }

  &::before {
    content: '';

    width: calc(100% - 2px);
    height: calc(100% - 2px);

    border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;

    position: absolute;
    top: 1px;
    left: 1px;

    backdrop-filter: ${({ stick }) =>
      stick ? 'blur(20px) saturate(2.5)' : 'none'};

    transition: ${({ theme }) => theme.transitions.create(['backdrop-filter'])};
  }

  @media print {
    display: none;
  }
`

export const TitleContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(0, 1)};

  position: relative;
  display: flex;
  flex: 1 1 auto;

  > * {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
