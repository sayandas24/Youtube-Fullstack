const timeSince = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const seconds = Math.floor((now - postedDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'month' : 'months'} ago`;
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'week' : 'weeks'} ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'day' : 'days'} ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'hour' : 'hours'} ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} ${interval === 1 ? 'minute' : 'minutes'} ago`;
    return `${Math.floor(seconds)} ${seconds === 1 ? 'second' : 'seconds'} ago`;
};

export default timeSince;