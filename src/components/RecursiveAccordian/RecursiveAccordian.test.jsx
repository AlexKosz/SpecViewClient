/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecursiveAccordian from './RecursiveAccordian';

// Mock components for testing
const MockBaseAccordianBody = ({ data }) => <div>Base Body: {data.content}</div>;
const MockAccordianSummaryBody = ({ data }) => <div>Summary: {data.name}</div>;

describe('RecursiveAccordian', () => {
  const mockData = {
    name: 'Parent',
    content: 'Parent content',
    children: {
      child1: {
        name: 'Child 1',
        content: 'Child 1 content',
        children: {},
      },
      child2: {
        name: 'Child 2',
        content: 'Child 2 content',
        children: {
          grandchild: {
            name: 'Grandchild',
            content: 'Grandchild content',
            children: {},
          },
        },
      },
    },
  };

  it('renders without crashing', () => {
    render(
      <RecursiveAccordian
        data={mockData}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
      />
    );
  });

  it('displays the summary correctly', () => {
    render(
      <RecursiveAccordian
        data={mockData}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
      />
    );
    expect(screen.getByText('Summary: Parent')).toBeInTheDocument();
  });

  it('shows expand icon', () => {
    render(
      <RecursiveAccordian
        data={mockData}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
      />
    );
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
  });

  it('is expanded by default when isTop is true', () => {
    render(
      <RecursiveAccordian
        data={{
          name: 'Parent',
          content: 'Parent content', // Must match exactly
        }}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
        isTop
      />
    );

    expect(screen.getByText('Base Body: Parent content')).toBeInTheDocument();
  });

  it('is collapsed by default when isTop is false', () => {
    render(
      <RecursiveAccordian
        data={mockData.children.child1}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
      />
    );
    expect(screen.queryByText('Base Body: Child 1 content')).not.toBeInTheDocument();
  });

  it('expands and collapses when clicked', () => {
    render(
      <RecursiveAccordian
        data={mockData.children.child1}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
      />
    );

    // Initially collapsed
    expect(screen.queryByText('Base Body: Child 1 content')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Base Body: Child 1 content')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Base Body: Child 1 content')).not.toBeInTheDocument();
  });

  it('renders children when expanded', () => {
    render(
      <RecursiveAccordian
        data={mockData}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
        isTop
      />
    );

    expect(screen.getByText('Summary: Child 1')).toBeInTheDocument();
    expect(screen.getByText('Summary: Child 2')).toBeInTheDocument();
  });

  it('renders nested children correctly', async () => {
    render(
      <RecursiveAccordian
        data={mockData}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
        isTop
      />
    );

    // Expand Child 1
    fireEvent.click(screen.getAllByRole('button')[1]);

    // Expand Child 2
    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(screen.getByText('Summary: Grandchild')).toBeInTheDocument();
  });

  it('renders base body when no children exist', () => {
    render(
      <RecursiveAccordian
        data={mockData.children.child1}
        BaseAccordianBody={MockBaseAccordianBody}
        AccordianSummaryBody={MockAccordianSummaryBody}
        isTop
      />
    );

    expect(screen.getByText('Base Body: Child 1 content')).toBeInTheDocument();
  });

  it('has correct default props', () => {
    expect(RecursiveAccordian.defaultProps.isTop).toBe(false);
  });
});
