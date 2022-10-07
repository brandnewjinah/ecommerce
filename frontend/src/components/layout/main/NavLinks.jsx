import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoint } from "../../token";

const NavLinks = ({ handleClick }) => {
  const links = [
    {
      id: 100,
      value: "all",
      label: "All",
      link: "/products/all",
    },
    {
      id: 200,
      value: "new",
      label: "New",
      link: "/products/bakery",
    },
    {
      id: 300,
      value: "snacks",
      label: "Snacks",
      link: "/products/snacks",
      submenu: true,
      subcategories: [
        {
          head: "Title 1",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 4",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
      ],
    },
    {
      id: 400,
      value: "beverage",
      label: "Beverage",
      link: "/products/beverage",
      submenu: true,
      subcategories: [
        {
          head: "Title 1",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 4",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
      ],
    },
    {
      id: 400,
      value: "pantry",
      label: "Pantry",
      link: "/products/pantry",
      submenu: true,
      subcategories: [
        {
          head: "Title 1",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          head: "Title 4",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {links.map((link) => (
        <>
          <ListItem>
            <p className="link" onClick={handleClick}>
              {link.label}
            </p>
            {link.submenu && (
              <div className="dropdown-menu">
                <ul>
                  {link.subcategories.map((subcategory) => (
                    <div>
                      <h1>{subcategory.head}</h1>
                      {subcategory.links.map((link) => (
                        <li>
                          <Link to={link.link}>{link.label}</Link>
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </ListItem>

          <div>
            {link.submenu &&
              link.subcategories.map((subcategory) => (
                <ul>
                  <h1>{subcategory.head}</h1>
                  {subcategory.links.map((link) => (
                    <li>
                      <Link to={link.link}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </>
      ))}
    </>
  );
};

const ListItem = styled.li`
  position: relative;

  .dropdown-menu {
    position: absolute;
    display: none;
    background-color: yellow;
    padding: 1rem;
    z-index: 10;
  }

  &:hover > .dropdown-menu {
    display: block;

    @media ${breakpoint.lg} {
      display: none;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
`;

export default NavLinks;
