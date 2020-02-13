import React from "react";

import { render, fireEvent, waitForElement, getByText } from "@testing-library/react";
import axiosMock from 'axios'

import ContactForm from '../components/ContactForm';

test("renders ContactForm without crashing", () => {
    render(<ContactForm/>);
});

test("renders all form components properly", () => {
    const { getByTestId } = render(<ContactForm/>)

    const formElement = getByTestId('form-element')
    const nameElement = getByTestId('name-element')
    const lastNameElement = getByTestId('last-element')
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
});

jest.mock('axios')

test('Handles form submit properly', async () => {

    const { getByTestId, getByText, getByLabelText } = render(<ContactForm/>)

    // Get reference to all elements
    // Get by label text

    const nameElement = getByLabelText(/First Name*/i)
    const lastNameElement = getByLabelText(/Last Name*/i)
    const emailElement = getByLabelText(/emai*/i)
    const messageElement = getByLabelText(/message/i)
    const inputElement = getByTestId('input-element')

    fireEvent.change(nameElement, {target: {value: 'Philbo'}});
    fireEvent.change(lastNameElement, {target: {value: 'Gilbo'}});
    fireEvent.change(emailElement, {target: {value: 'philbo@gilbo.com'}});
    fireEvent.change(messageElement, {target: {value: 'Philbos special message'}});

    expect(nameElement.value).toBe('Philbo')
    expect(lastNameElement.value).toBe('Gilbo')
    expect(emailElement.value).toBe('philbo@gilbo.com')
    expect(messageElement.value).toBe('Philbos special message')

    // fireEvent.click(button)

})