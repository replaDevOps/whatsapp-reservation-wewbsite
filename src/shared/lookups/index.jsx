const businessType = [
    {
        id: 1,
        name:"Barber"
    },
    {
        id: 2,
        name:"Clinic"
    },
    {
        id: 3,
        name:"Spa"
    },
    {
        id: 4,
        name:"General"
    }
]
const subscriptionValidityLookup=[
    {id:"MONTHLY", name: "MONTHLY", label: 'Monthly', value: 'MONTHLY'},
    {id:"YEARLY", name: "YEARLY", label: 'Yearly', value: 'YEARLY'},
]
const subsscriptionPlansLookup=[
    {id:"BASIC", name: "BASIC", label: "Basic"},
    {id:"STANDARD", name: "STANDARD", label: "Standard"},
    {id:"PRO", name: "PRO", label: "Pro"},
    {id:"ENTERPRISE", name: "ENTERPRISE", label: "Enterprise"},
]
const businessTypeLookup= [
    {id:"SPA", name: "SPA"},
    {id:"CLINIC", name: "CLINIC"},
    {id:"BARBER", name: "BARBER"},
    {id:"GENERAL", name: "GENERAL"}
]

export {businessType, subscriptionValidityLookup, subsscriptionPlansLookup, businessTypeLookup}