function format_date(created_at) {
    return created_at.toLocaleString('fr-FR');
}

function format_status(status) {
    return (status
        === 1) ? "Done" : "To do";
}

export { format_date, format_status }