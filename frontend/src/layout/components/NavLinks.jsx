import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { breakpoint, neutral } from "../../components/token";
import { ChevronDown, ChevronUp } from "../../assets/Icon";

const NavLinks = ({ handleClick }) => {
  const links = [
    {
      id: 300,
      value: "snacks",
      label: "Snacks",
      link: "/category/snacks",
      submenu: true,
      subcategories: [
        {
          label: "Snacks 1",
          links: [
            {
              id: 301,
              value: "chips",
              label: "Chips",
              link: "/category/snacks",
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
      link: "/category/beverage",
      submenu: true,
      subcategories: [
        {
          label: "Bev 1",
          links: [
            {
              id: 301,
              value: "chips",
              label: "Chips",
              link: "/category/beverage",
            },
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
      link: "/category/pantry",
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
              className="listLabel"
              onClick={() => {
                heading !== link.label
                  ? setHeading(link.label)
                  : setHeading("");
                setSubHeading("");
              }}
            >
              {link.label}
              {/* Mobile Chevron Icon */}
              {link.submenu && (
                <Icon>
                  {heading === link.label ? (
                    <ChevronUp width={20} height={20} color="#000" stroke={2} />
                  ) : (
                    <ChevronDown
                      width={20}
                      height={20}
                      color="#000"
                      stroke={2}
                    />
                  )}
                </Icon>
              )}
            </p>
            {link.submenu && (
              <div className="dropdown">
                <ul>
                  {link.subcategories.map((subcategory) => (
                    <div>
                      <p>{subcategory.label}</p>
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
                    <Icon>
                      {subHeading === subcategory.label ? (
                        <ChevronUp
                          width={20}
                          height={20}
                          color="#000"
                          stroke={2}
                        />
                      ) : (
                        <ChevronDown
                          width={20}
                          height={20}
                          color="#000"
                          stroke={2}
                        />
                      )}
                    </Icon>
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
  .listLabel {
    padding: 20px min(1vw, 16px);
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    top: 55px;
    left: 0;
    right: 0;
    display: none;
    background-color: #fff;
    border-top: 1px solid ${neutral[100]};
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.02);
    padding: 1rem 5rem;
    z-index: 100;
  }

  &:hover > .dropdown {
    display: block;

    @media ${breakpoint.lg} {
      display: none;
    }
  }

  p {
    padding-bottom: 0.5rem;
  }

  a {
    color: ${neutral[500]};
    padding: 0.35rem 0;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const Mobile = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: ${(props) => props.display && "flex"};
    flex-direction: column;
  }
`;

const MobileSub = styled.div`
  display: none;

  @media ${breakpoint.lg} {
    display: ${(props) => props.display && "block"};
  }
`;

const Icon = styled.span`
  display: none;

  @media ${breakpoint.lg} {
    display: inline-block;
  }
`;

export default NavLinks;
