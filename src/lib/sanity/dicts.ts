/** Dictionaries to easily look up Sanity document IDs for workspaces, categories, etc. */
export const SanityGeographicalAreaCategories = {
    americas: {
        id: '756997c3-c26f-4c65-bf35-eb184dfdbcfd',
        name: 'The Americas',
    },
    centralWestAsia: {
        id: '8673cc06-e0d9-478f-935a-72fbcb61b28d',
        name: 'Central and West Asia',
    },
    eastAsia: {
        id: 'aea74466-a858-475a-ba5d-5c3a3f59a708',
        name: 'East Asia',
    },
    mediterranean: {
        id: '5e3c7d8f-c0f4-4976-bf67-35a52590a39d',
        name: 'Mediterranean',
    },
};

export const SanityPeopleCategories = {
    affiliate: {
        id: 'd50dee37-3d98-4573-9bbd-001bec4fcee4',
        name: 'Affiliate',
    },
    faculty: {
        id: '148d0678-7806-4aa7-8be7-20924e0cac94',
        name: 'Faculty',
    },
    gradStudent: {
        id: '494d88e8-c752-475f-a7a4-272c0f18b9fc',
        name: 'Grad Student',
    },
    staff: {
        id: '7b170fbe-f180-4590-b854-b691b9ab8e83',
        name: 'Staff',
    },
};

export const SanityEventCategories = {
    cosponsored: {
        id: '0879b3dc-3dd5-4bf8-8003-5b30959bcc04',
        name: 'Co-Sponsored',
    },
    distinguishedSpeakerSeries: {
        id: '904ce50f-3a32-48da-bdc1-d3d1005d3cc9',
        name: 'Distinguished Speaker Series',
    },
    facultyLunchSeries: {
        id: 'b3a40bea-28b7-4601-9c09-4ce4a006ada2',
        name: 'Faculty Lunch Series',
    },
    symposium: {
        id: '27c9d9cb-11ad-4b89-9435-1338cbed43e3',
        name: 'Symposium',
    },
    workshop: {
        id: '1037ef8f-1bfa-4ffc-96b5-79558cd3b563',
        name: 'Workshop',
    },
};

export const SanityUCLADepartments: Record<string, string> = {
    anthropology: 'Anthropology',
    'art-history': 'Art History',
    alc: 'Asian Languages & Cultures',
    cch: 'Conservation of Cultural Heritage (UCLA/Getty)',
    csr: 'Center for the Study of Religion',
    classics: 'Classics',
    cmrs: 'Center for Medieval and Renaissance Studies',
    cotsen: 'Cotsen Institute of Archaeology',
    hellenic: 'Hellenic Culture',
    history: 'History',
    lspa: 'Luskin School of Public Affairs',
    nelc: 'Near Eastern Languages and Cultures',
    pies: 'Program in Indo-European Studies',
};
