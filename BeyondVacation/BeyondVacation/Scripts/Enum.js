
var Enum = {
    TypeOfInspection: {
        LM: 1,
        EI: 2,
        PI: 3
    },
    AddressBookType: {
        Client: 130,
        IsForeignClient: 131,
        Creditor: 132,
        IsReporter: 133
    },
    Country: {
        India: 76

    },
    ClientType: {

        Client: 130,
        ForeignClient: 131,
        Creditor: 132,
        Reportingonly: 133

    },
    FileDocuments: {
        RFI: 135,
        CallLetter: 41,
        CallDetails: 42,
        SupportingDocument: 43,
        InspectionReport: 44,
        QualityAssurancePlan: 45,
        InspectionTestPlan: 46, 
        Drawings: 47,
        PurchaseOrder: 48,
        CoveringLetter: 49,
        Invoice: 50
    },
    GSToption: {
        Registered: 28,
        UnRegistered: 27,
    },
    Master: {
        Pincode: 'P',
        Location: 'L',
        City: 'C'
    },
    ReferenceDocument: {
        POScope: '24',
        QAP:'25',
        RefStandard: '26'
        
    },
    ReferenceDocumentID: {
        ToBeCollected: 136,
        UploadDocument: 137

    },
    ReferenceDocumentPath: {
        Path: '~/Documents/RFI/POQAP/'
    },
    InspectionType: {
        
        Manufacturer: 12,
        Site: 13,
        ConsigneeEnd: 14,
        ClientPremises: 15,
        Warehouse:16
    },
    WorkType: {
        Contract: 35,
        AWC: 36
    },
    ISDcode: {
        India: '+91',
    },
    ReportType: {
        StageReport: 146,
        InspectionReleaseNote: 147,
        FinalReport: 148
    },
    EmployeeScandocs: {
        BioData: 81,
        AadharCard: 83,
        EPFO: 84,
        PanCard: 85,
        ElectionCard: 86
    },
    Units: {
        Length: 37,
        Numbers: 38,
        Volume: 39,
        Weight: 40
    }
}