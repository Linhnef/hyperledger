import { Link } from "react-router-dom"
import { ReactNode } from "react"
import styled from "styled-components"
import { Subtitle1 } from "../typography/Subtitle1"
import { spacing } from "../../theme"

type ButtonLinkProps = {
  link: string
  children: ReactNode
}
export const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <Root>
      <Link to={props.link}>
        <Text>{props.children}</Text>
      </Link>
    </Root>
  )
}
const Root = styled.div`
  a {
    text-decoration: none;
  }
  margin: 0 ${spacing.xxs};
`
const Text = styled(Subtitle1)`
  font-weight: 700;
`