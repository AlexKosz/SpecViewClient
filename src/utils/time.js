function formatEpochToDate(epoch) {
  const date = new Date(epoch); // No need to multiply by 1000, as it's in milliseconds

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: '2-digit',
    year: '2-digit',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}

export default formatEpochToDate;
