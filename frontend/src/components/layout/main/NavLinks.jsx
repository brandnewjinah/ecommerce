import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoint } from "../../token";

const NavLinks = ({ handleClick }) => {
  const links = [
    {
      id: 300,
      value: "snacks",
      label: "Snacks",
      link: "/products/snacks",
      submenu: true,
      subcategories: [
        {
          label: "Snacks 1",
          links: [
            {
              id: 301,
              value: "chips",
              label: "Chips",
              link: "/products/snacks",
            },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Snacks 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Snacks 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Snacks 4",
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
          label: "Bev 1",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Bev 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Bev 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Bev 4",
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
          label: "Pantry 1",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Pantry 2",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Pantry 3",
          links: [
            { id: 301, value: "chips", label: "Chips", link: "/" },
            { id: 302, value: "cookies", label: "Cookies", link: "/" },
            { id: 303, value: "candy", label: "Candy", link: "/" },
            { id: 304, value: "chocolate", label: "Chocolate", link: "/" },
            { id: 305, value: "savory", label: "Savory", link: "/" },
          ],
        },
        {
          label: "Pantry 4",
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

  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {links.map((link) => (
        <>
          <ListItem>
            <p
              className="link"
              onClick={() => {
                heading !== link.label
                  ? setHeading(link.label)
                  : setHeading("");
                setSubHeading("");
              }}
            >
              {link.label}
              {link.submenu && (
                <span>{heading === link.label ? `↑` : `↓`}</span>
              )}
            </p>
            {link.submenu && (
              <div className="dropdown-menu">
                <ul>
                  {link.subcategories.map((subcategory) => (
                    <div>
                      <h1>{subcategory.label}</h1>
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
          {/* Mobile SubCategories */}
          <Mobile display={heading === link.label}>
            {link.submenu &&
              link.subcategories.map((subcategory) => (
                <ul>
                  <h1
                    onClick={() =>
                      subHeading !== subcategory.label
                        ? setSubHeading(subcategory.label)
                        : setSubHeading("")
                    }
                  >
                    {subcategory.label}
                    <span>{subHeading === subcategory.label ? `↑` : `↓`}</span>
                  </h1>
                  <MobileSub display={subHeading === subcategory.label}>
                    {subcategory.links.map((link) => (
                      <li>
                        <Link
                          to={link.link}
                          onClick={() => {
                            handleClick();
                            setHeading("");
                            setSubHeading("");
                          }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </MobileSub>
                </ul>
              ))}
          </Mobile>
        </>
      ))}
    </>
  );
};

const ListItem = styled.li`
  /* position: relative; */

  .dropdown-menu {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
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

const Mobile = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: ${(props) => props.display && "block"};
  }
`;

const MobileSub = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: ${(props) => props.display && "block"};
  }
`;

export default NavLinks;
