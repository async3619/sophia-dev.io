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
  top: ${({ theme }) => theme.spacing(STICKY_OFFSET)};

  z-index: ${({ theme }) => theme.zIndex.appBar};

  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  background-color: ${({ theme }) =>
    `rgba(${theme.vars.palette.background.defaultChannel} / 0.5)`};
  box-shadow: ${({ theme, stick }) => (stick ? theme.shadows[16] : 'none')};

  backdrop-filter: ${({ stick }) =>
    stick ? 'blur(20px) saturate(2.5)' : 'none'};

  transition: ${({ theme }) =>
    theme.transitions.create([
      'border-color',
      'box-shadow',
      'backdrop-filter',
    ])};

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    border: 1px solid
      ${({ stick }) => (stick ? 'rgba(80, 80, 80, 1)' : 'transparent')};
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    border: 1px solid
      ${({ theme, stick }) => (stick ? theme.palette.divider : 'transparent')};
  }

  .title {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: none;
  }
`

export const TitleContainer = styled.div`
  width: 300px;

  position: relative;
  display: flex;

  > * {
    position: absolute;
    top: 0;
    left: 0;

    transform: translateY(-50%);
  }
`
