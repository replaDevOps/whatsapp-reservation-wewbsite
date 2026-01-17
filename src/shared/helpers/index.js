function extractPlanFeatures(plan) {
    const ignoreKeys = ["price", "__typename", "id", "type", "description"]
    const labels = {
        noOfBranches: "Branch",
        noOfAdmins: "Admin",
        noOfStaffManagers: "Staff Manager",
        noOfServiceProviders: "Service Provider",
        noOfReceptionists: "Receptionist",
        whatsappBot: "WhatsApp Bot",
        manualReminder: "Manual Reminders",
        automatedReminder: "Automated Reminders",
        googleReviewLink: "Google Review Link",
        promotions: "Promotions",
        selfServiceTablet: "Self Service Tablet",
        basicDashboard: "Basic Dashboard",
        fullAccessDashboard: "Full Access Dashboard",
    }
    const features = [];
    for (let key in plan) {
        if (ignoreKeys.includes(key)) continue;

        const value = plan[key];
        const label = labels[key];

        if (!label) continue;

        // Number features
        if (typeof value === "number" && value > 0) {
        features.push({
            title: `${value} ${label}${value > 1 ? "s" : ""}`
        });
        }
        // Boolean features
        if (typeof value === "boolean" && value === true) {
        features.push({
            title: label
        });
        }
    }
    return features
}

const notifySuccess = (api, message, description, onClose) => {
    api.success({
        message,
        description,
        showProgress: true,
        pauseOnHover: true,
        onClose,
        duration: 2,
    });
};

const notifyError = (api, error) => {
    api.error({
        message: "Error",
        description: error?.message || "Something went wrong",
        showProgress: true,
        pauseOnHover: true,
        duration:1
    });
};

export {
    extractPlanFeatures,
    notifySuccess,
    notifyError,
}
export * from './TableLoader';