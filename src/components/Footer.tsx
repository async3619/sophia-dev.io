import * as Styled from './Footer.styled'
import { Typography } from '@mui/material'
import Link from 'next/link'

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
          <tr>
            <td colSpan={2}>
              <Link href="/resume" passHref legacyBehavior>
                <Typography component={Styled.Link} variant="body2">
                  Resume
                </Typography>
              </Link>
            </td>
          </tr>
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
