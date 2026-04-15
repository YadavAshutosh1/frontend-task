export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

export const getPriorityColor = (priority) => {
    switch (priority){
        case "high":
            return "text-red-500";
        case "medium":
            return "text-yellow-500";
        case "low":
            return "text-green-500";
            default:
                return "text-gray-500"        
    }
};