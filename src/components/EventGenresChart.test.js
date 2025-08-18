// src/components/EventGenresChart.test.js

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import EventGenresChart from './EventGenresChart';
// We use a default import because of the 'default' export in mock-data.js
import mockData from '../mock-data';

describe('<EventGenresChart /> component', () => {
  test('renders the chart correctly with given events', () => {
    // Pass mockData.default, which is the actual array of events
    const { container } = render(<EventGenresChart events={mockData.default} />);
    
    // Check if the chart's main container element is in the document
    const chartContainer = container.querySelector('.recharts-responsive-container');
    expect(chartContainer).toBeInTheDocument();
  });
});