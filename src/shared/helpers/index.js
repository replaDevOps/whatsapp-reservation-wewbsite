function extractPlanFeatures(plan) {
    const ignoreKeys = ["yearlyPrice","discountPrice","discountYearlyPrice","price", "__typename", "id", "type", "description"]
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
            title: `${value} ${label === 'Branch' ? label+'es':`${label}${value > 1 ? "s" : ""}`}`
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
        description: error?.message || error,
        showProgress: true,
        pauseOnHover: true,
        duration:1
    });
};

const capitalizeTranslated = (value, t) => {
  if (value === null || value === undefined) return "";

  // Convert value to string first
  let str = String(value);

  // If t is a function, translate it
  if (typeof t === "function") {
    str = String(t(value));
  }

  // Capitalize first letter, rest lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const refetchOnFocus = (refetch) => {
  const handleFocus = () => {
    if (typeof refetch === 'function') {
      refetch();
    }
  };

  window.addEventListener('focus', handleFocus);

  return () => {
    window.removeEventListener('focus', handleFocus);
  };
};


export {
    extractPlanFeatures,
    notifySuccess,
    notifyError,
    capitalizeTranslated,
    refetchOnFocus
}
export * from './TableLoader';
export * from './SmLoader'