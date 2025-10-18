export const pricingData = [
    {
      key: 1,
      plan: 'Basic',
      desc: 'Simple start for small setups',
      monthlyPrice: 200,
      yearlyPrice: 2000, // 👈 yearly price add
      features: [
        { key: 1, title: '1 Branch' },
        { key: 2, title: '10 Doctor/Support Accounts' },
        { key: 3, title: '2 Reception Accounts' },
        { key: 4, title: 'WhatsApp Bot' },
        { key: 5, title: 'Manual Reminders' },
        { key: 6, title: 'Basic Dashboard' }
      ]
    },
    {
      key: 2,
      plan: 'Standard',
      desc: 'For growing & scaling clinics',
      monthlyPrice: 300,
      yearlyPrice: 3000,
      features: [
        { key: 1, title: 'Up to 3 Branches' },
        { key: 2, title: '3 Admin Accounts' },
        { key: 3, title: '30 Doctor' },
        { key: 4, title: '30 Support Accounts' },
        { key: 5, title: '6 Reception Accounts' },
        { key: 6, title: 'Full Dashboard' },
        { key: 7, title: 'WhatsApp Bot' },
        { key: 8, title: 'Full Admin Panel Access' },
        { key: 9, title: 'Auto Reminders' }
      ]
    },
    {
      key: 3,
      plan: 'Pro',
      desc: 'Advanced tools for large teams',
      monthlyPrice: 500,
      yearlyPrice: 5000,
      features: [
        { key: 1, title: 'Unlimited Branches' },
        { key: 2, title: 'Unlimited Admin' },
        { key: 3, title: 'Unlimited Doctor' },
        { key: 4, title: '30 Support Accounts' },
        { key: 5, title: 'Full Admin Panel Access' },
        { key: 6, title: 'Google Reviews Link' },
        { key: 7, title: 'Client List Marketing Feature' },
        { key: 8, title: 'Auto Reminders' },
        { key: 9, title: 'Visitor Self-Service Tablet' }
      ]
    },
    {
      key: 4,
      plan: 'Enterprise',
      desc: 'Custom workflow for full control',
      monthlyPrice: 800,
      yearlyPrice: 8000,
      features: [
        { key: 1, title: 'All Pro Features' },
        { key: 2, title: 'Custom Workflow' },
        { key: 3, title: 'API Access' },
        { key: 4, title: 'Dedicated SLA Support' },
        { key: 5, title: 'System Customization as per Client Needs' }
      ]
    }
  ];