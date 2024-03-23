import styled from '@emotion/styled'

export const Root = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  table {
    border-spacing: 0;

    th,
    td {
      padding: 0;
    }

    th {
      padding: ${({ theme }) => theme.spacing(0.25, 0, 0.25, 2)};

      text-align: right;
      white-space: nowrap;
    }

    td {
      padding-left: ${({ theme }) => theme.spacing(1)};
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    table {
      display: block;

      tbody {
        display: block;
      }

      tr {
        display: flex;
        flex-direction: column;
      }

      td,
      th {
        display: block;
        text-align: left;
      }

      td {
        padding: ${({ theme }) => theme.spacing(0)};
        margin-bottom: ${({ theme }) => theme.spacing(1)};
      }

      th {
        padding: ${({ theme }) => theme.spacing(0)};
      }
    }
  }
`
