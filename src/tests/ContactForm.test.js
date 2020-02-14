import React from "react";

import { render, fireEvent, waitForElement } from "@testing-library/react";
import axiosMock from 'axios'
import axios from 'axios'

import ContactForm from '../components/ContactForm';
import { act } from "react-dom/test-utils";

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

describe('Post Method', () => {
    // Testing to ensure that we can mock a post request successfully
    it('Handles POST correctly', async () => {
        const testData = {name: 'Testing', email: 'Testing'}

        axios.post.mockImplementationOnce(() => Promise.resolve(testData))
    })
    // Testing to ensure we can detect a POST error if it were to occur
    it('Handles POST Error', async () => {
        const errorMesasge = 'Network Error';

        axios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMesasge)))
    })
})

// Testing to ensure that all form elements update properly
test('Handles form changes properly', async () => {

    const { getByLabelText, getByTestId } = render(<ContactForm/>)

    // Arrange
    // Get reference to all elements in the form
    // Get by label text to allow reference to input's

    const nameElement = getByLabelText(/First Name*/i)
    const lastNameElement = getByLabelText(/Last Name*/i)
    const emailElement = getByLabelText(/emai*/i)
    const messageElement = getByLabelText(/message/i)
    const inputElement = getByTestId('input-element') 

    // Act
    // Change all of the input field to something that can be tested

    fireEvent.change(nameElement, {target: {value: 'Philbo'}});
    fireEvent.change(lastNameElement, {target: {value: 'Gilbo'}});
    fireEvent.change(emailElement, {target: {value: 'philbo@gilbo.com'}});
    fireEvent.change(messageElement, {target: {value: 'Philbos special message'}});

    // Assert
    // Check all of the fields to ensure that everything was changes correctly

    expect(nameElement.value).toBe('Philbo')
    expect(lastNameElement.value).toBe('Gilbo')
    expect(emailElement.value).toBe('philbo@gilbo.com')
    expect(messageElement.value).toBe('Philbos special message')

    act(() => {
        inputElement.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    expect(nameElement.value).toBe('Philbo')
    expect(lastNameElement.value).toBe('Gilbo')
    expect(emailElement.value).toBe('philbo@gilbo.com')
    expect(messageElement.value).toBe('Philbos special message')
})

// test('Testing', async () => {
//     const { getByTestId, asFragment } = render(<ContactForm />)
//     const firstRender = asFragment()

//     fireEvent.click(getByTestId('input-element'))
//     expect(firstRender).toMatchDiffSnapshot(asFragment())
// })

// it('testButton', async () => {
//     const { getByText, getByLabelText, getByTestId } = render(<ContactForm />)

//     fireEvent.click(getByTestId('input-element'))

//     await waitForElement(()=> {
//         expect(getByTestId('input-element')).toBeInTheDocument();
//     })
//   })