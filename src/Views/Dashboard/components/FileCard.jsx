import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Divider } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const FileCard = ({ file }) => {
  const data = [
    { name: 'Passed', value: file.numPassedTestSuites || 0, color: '#00C49F' },
    { name: 'Failed', value: file.numFailedTestSuites || 0, color: '#FF4040' },
    {
      name: 'Skipped',
      value: (file.numPendingTestSuites || 0) + (file.numRuntimeErrorTestSuites || 0),
      color: '#FFBB28',
    },
  ];

  // Format the start time as "Month Date, 20XY hour:minutes"
  const startDate = new Date(file.startTime);
  const formattedStartDate = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getDate()}, ${startDate.getFullYear()} ${startDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 4,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {file.name || 'Untitled File'}
          </Typography>

          {file?.startTime && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {formattedStartDate}
            </Typography>
          )}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
              minWidth: 200,
              maxWidth: 300,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Test Suites
            </Typography>
            {data.map(({ name, value, color }) => (
              <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: color,
                  }}
                />
                <Typography variant="body2">
                  {name}: <strong>{value}</strong>
                </Typography>
              </Box>
            ))}
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Total: <strong>{file?.testResults?.length}</strong>
            </Typography>
          </Stack>

          <Box
            sx={{
              width: 200,
              height: 200,
              flexShrink: 0,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius="60%" outerRadius="80%" dataKey="value" stroke="none">
                  {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FileCard;

FileCard.propTypes = {
  file: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number,

    numFailedTestSuites: PropTypes.number.isRequired,
    numFailedTests: PropTypes.number.isRequired,
    numPassedTestSuites: PropTypes.number.isRequired,
    numPassedTests: PropTypes.number.isRequired,
    numPendingTestSuites: PropTypes.number.isRequired,
    numPendingTests: PropTypes.number.isRequired,
    numRuntimeErrorTestSuites: PropTypes.number.isRequired,
    numTodoTests: PropTypes.number.isRequired,
    numTotalTestSuites: PropTypes.number.isRequired,
    numTotalTests: PropTypes.number.isRequired,

    startTime: PropTypes.number.isRequired,
    success: PropTypes.bool.isRequired,
    wasInterrupted: PropTypes.bool.isRequired,

    testResults: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};
