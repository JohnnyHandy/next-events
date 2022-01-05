import { Fragment } from 'react'
import MainHeader from './main-header'

function Layout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <Fragment>
      <MainHeader data-testid="layout-header" />
      <main data-testid="layout">{children}</main>
    </Fragment>
  )
}

export default Layout
