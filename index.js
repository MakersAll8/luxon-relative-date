const { DateTime } = require('luxon');

const getRelativeDate = (date) => {
  const targetDate = DateTime.fromISO(date);
  // const now = DateTime.now().setZone('Australia/Melbourne');
  const now = DateTime.now();
  const today = now.startOf('day');

  if (targetDate.hasSame(today, 'day')) {
    return 'today';
  }
  const tomorrow = DateTime.now().plus({ days: 1 });
  if (targetDate.hasSame(tomorrow, 'day')) {
    return 'tomorrow';
  }
  const startOfThisWeek = DateTime.now().startOf('week');
  const endOfThisWeek = startOfThisWeek
    .plus({ week: 1 })
    .minus({ milliseconds: 1 });
  if (targetDate >= startOfThisWeek && targetDate <= endOfThisWeek) {
    const dayOfWeekName = targetDate.weekdayLong;
    return `this ${dayOfWeekName}`;
  }

  const startOfNextWeek = startOfThisWeek.plus({ week: 1 });
  const endOfNextWeek = startOfNextWeek
    .plus({ week: 1 })
    .minus({ milliseconds: 1 });
  if (targetDate >= startOfNextWeek && targetDate <= endOfNextWeek) {
    const dayOfWeekName = targetDate.weekdayLong;
    return `next ${dayOfWeekName}`;
  }
  const relative = targetDate.toRelative({ base: today });
  return relative;
};

const result = getRelativeDate('2023-06-13T00:00:00.000Z');

console.log(result);
