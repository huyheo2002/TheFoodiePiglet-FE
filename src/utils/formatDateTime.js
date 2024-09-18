function FormatDateTime(dateTimeString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
}

export default FormatDateTime;