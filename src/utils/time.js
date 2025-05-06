const formatEpochToDate = (epoch) => {
  if (epoch === null || epoch === undefined) {
    return 'Invalid Date';
  }

  const date = new Date(Number(epoch));

  if (Number.isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: '2-digit',
    year: '2-digit',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default formatEpochToDate;
