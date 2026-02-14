export const getStatusBadgeClass = (status) => {
  switch (status) {
    case "pending":
      return "text-bg-secondary";
    case "in_progress":
      return "text-bg-primary";
    case "completed":
      return "text-bg-success";
    default:
      return "text-bg-dark";
  }
};

export const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case "low":
      return "text-bg-success";
    case "medium":
      return "text-bg-warning";
    case "high":
      return "text-bg-danger";
    default:
      return "text-bg-dark";
  }
};