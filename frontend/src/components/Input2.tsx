import React, { ChangeEvent, FC, useState } from "react";
import { useField, ErrorMessage } from "formik";
import styled, { css } from "styled-components";

//layout component
import { Article } from "./layout/Container";
import { neutral, spacing, typeScale } from "./token";

export interface Props {
  label?: string;
  name: string;
  type?: "text" | "password" | "number";
}

type StyleProps = {
  align?: string | undefined;
};

export const Input: FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Article padding=".5rem 0">
      {label && (
        <label htmlFor={field.name} aria-hidden="true">
          {label}
        </label>
      )}

      <Container>
        <InputTag
          className={`${meta.touched && meta.error && "error"}`}
          {...field}
          {...props}
          name={field.name}
          aria-label={field.name}
        />
      </Container>
      <ErrorMessage name={field.name} component="div" className="errorTxt" />
    </Article>
  );
};

const Global = css<StyleProps>`
  width: 100%;
  font-size: 1rem;
  border-radius: ${spacing.xxxs};
  border: 1px solid #d2d2d7;
`;

const Container = styled.div`
  position: relative;

  .pw {
    position: absolute;
    top: 0.85rem;
    right: 0.75rem;
    display: flex;
    cursor: pointer;
  }
`;

const InputTag = styled.input<StyleProps>`
  ${Global}
  /* height: 3rem; */
  padding: ${spacing.xs};
  appearance: none;
  text-align: ${(props) => (props.align === "right" ? "right" : "left")};

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 125, 250, 0.6);
    border-radius: ${spacing.xxxs};
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 0.925rem;
    color: ${neutral[200]};
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 0.9rem;
  right: 0.75rem;
  cursor: pointer;
`;
