import * as Styled from './Footer.styled'
import { Typography } from '@mui/material'

export interface FooterItem {
  label: string
  href: string
  content: string
}

export interface FooterProps {
  items: FooterItem[]
}

export function Footer({ items }: FooterProps) {
  return (
    <Styled.Root>
      <Styled.Divider />
      <Styled.Table>
        <tbody>
          {items.map((item) => (
            <tr key={item.href}>
              <th>
                <Typography variant="body2">{item.label}</Typography>
              </th>
              <td>
                <Typography
                  component={Styled.Link}
                  href={item.href}
                  variant="body2"
                >
                  {item.content}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.Root>
  )
}
