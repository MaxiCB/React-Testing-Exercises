import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ContactForm from '../components/ContactForm';

test("renders ContactForm without crashing", () => {
    render(<ContactForm/>);
});

test("renders all form components properly", () => {
    const { getByTestId } = render(<ContactForm/>)

    const formElement = getByTestId('form-element')
    const nameElement = getByTestId('name-element')
    const lastNameElement = getByTestId('last-name-element')
    const emailElement = getByTestId('email-element')
    const messageElement = getByTestId('message-element')
    const inputElement = getByTestId('input-element')

    const elements = [
        formElement,
        nameElement,
        lastNameElement,
        emailElement,
        messageElement,
        inputElement
    ]

    elements.forEach((elem, index) => {
        expect(elem).toBeInTheDocument()
        console.log('Testing of elem: ', index)
    })
})