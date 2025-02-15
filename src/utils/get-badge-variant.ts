export const getVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
        case "high":
            return "destructive";
        case "medium":
            return "warning";
        case "low":
            return "success";
        default:
            return "secondary";
    }
};