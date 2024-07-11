import React from 'react'
import {Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,} from '@nextui-org/react'
import WeightsNote from '../components/WeightsNote'


export default function CourseTitle() {
  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="text-blue-600 text-2xl decoration-double">
            Brighten
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <WeightsNote/>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
