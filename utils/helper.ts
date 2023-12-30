export const formatTimestamp = (timestamp: any) => {
  const targetDate = timestamp;
  const now: any = new Date();
  const timeDifference = now - targetDate;
  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  if (days < 1) {
    // Within the last 24 hours
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
    }

    const minutes = Math.floor(timeDifference / (60 * 1000));
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
    }

    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? 'sec' : 'sec'}`;
  } else {
    // More than 24 hours ago
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = targetDate.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
  }
};
