import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('<BLog/> renders content', () => {
  const blog = {
    title: 'A blog from the test file',
    author: 'Binxe Levankisty'
  }

  const handleUpdate = () => { return }
  const handleDelete = () => { return }

  const view = render(
    <Blog blog={blog} position={1} onUpdate={handleUpdate} onDelete={handleDelete} />
  )
  const blogContainer = view.container.querySelector('.blog-container')

  expect(blogContainer).toHaveTextContent('A blog from the test file')

})

test('<BLog/> renders content hide', () => {
  const blog = {
    title: 'A blog from the test file',
    author: 'Binxe Levankisty',
    url: 'url',
    likes: 54
  }

  const handleUpdate = () => { return }
  const handleDelete = () => { return }

  const view = render(
    <Blog blog={blog} position={1} onUpdate={handleUpdate} onDelete={handleDelete} />
  )
  const blogContainer = view.container.querySelector('.blog-container')

  const buttonShow = view.getByText('show')
  fireEvent.click(buttonShow)

  expect(blogContainer).toHaveTextContent('Binxe Levankisty')
  expect(blogContainer).toHaveTextContent('url')
  expect(blogContainer).toHaveTextContent('54')

})

test('Verify the event handler is dispatch', () => {
  const blog = {
    title: 'A blog from the test file',
    author: 'Binxe Levankisty',
    url: 'url',
    likes: 54
  }

  const mockHandler = jest.fn()

  const view = render(
    <Blog blog={blog} position={1} onUpdate={mockHandler} onDelete={mockHandler} />
  )

  const blogContainer = view.container.querySelector('.blog-container')

  const buttonShow = view.getByText('show')

  fireEvent.click(buttonShow)
  expect(blogContainer).toHaveTextContent('hide')

  fireEvent.click(buttonShow)
  expect(blogContainer).toHaveTextContent('show')
})

test('If the form is empty the button create must be disable', () => {

  const mockHandler = jest.fn()

  const view = render(
    <BlogForm onCreate={mockHandler} />
  )

  const buttonCreate = view.getByText('Create')
  expect(buttonCreate).toBeDisabled()

})