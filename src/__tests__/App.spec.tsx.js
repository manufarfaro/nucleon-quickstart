import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '../App';

describe('App component', () => {
  afterEach(() => {
    cleanup();
  })

  describe('when is called', () => {
    it('should render correctly', () => {
      const { asFragment } = render(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
