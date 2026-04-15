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

// ========== EXPIRY UTILITIES ==========

// Duration string ("5m", "15m", "1h", "2h", "1d") → milliseconds
export const parseDuration = (durationStr) => {
    const map = {
        "5m": 5 * 60 * 1000,
        "15m": 15 * 60 * 1000,
        "30m": 30 * 60 * 1000,
        "1h": 60 * 60 * 1000,
        "2h": 2 * 60 * 60 * 1000,
        "1d": 24 * 60 * 60 * 1000,
    };
    return map[durationStr] || 0;
};

// Duration label for display
export const getDurationLabel = (durationStr) => {
    const labels = {
        "5m": "5 Minutes",
        "15m": "15 Minutes",
        "30m": "30 Minutes",
        "1h": "1 Hour",
        "2h": "2 Hours",
        "1d": "1 Day",
    };
    return labels[durationStr] || durationStr;
};

// Check if task is expired
export const isTaskExpired = (taskId) => {
    const data = getExpiryData();
    const entry = data[taskId];
    if (!entry || !entry.expiresAt) return false;
    return new Date(entry.expiresAt) <= new Date();
};

// Get remaining time as readable string
export const getTimeRemaining = (taskId) => {
    const data = getExpiryData();
    const entry = data[taskId];
    if (!entry || !entry.expiresAt) return null;

    const diff = new Date(entry.expiresAt) - new Date();
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
};

// LocalStorage helpers for expiry data
const EXPIRY_KEY = "task_expiry_data";

export const getExpiryData = () => {
    try {
        return JSON.parse(localStorage.getItem(EXPIRY_KEY) || "{}");
    } catch {
        return {};
    }
};

export const setExpiryForTask = (taskId, durationStr) => {
    const data = getExpiryData();
    const ms = parseDuration(durationStr);
    data[taskId] = {
        expiresAt: new Date(Date.now() + ms).toISOString(),
        duration: durationStr,
    };
    localStorage.setItem(EXPIRY_KEY, JSON.stringify(data));
};

export const removeExpiryForTask = (taskId) => {
    const data = getExpiryData();
    delete data[taskId];
    localStorage.setItem(EXPIRY_KEY, JSON.stringify(data));
};