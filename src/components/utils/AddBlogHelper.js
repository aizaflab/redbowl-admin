

// Options for category
export const categoryOption = [
    { objectId: '1', value: 'travel', label: 'Travel' },
    { objectId: '2', value: 'digitalNomadLifestyle', label: 'Digital Nomad Lifestyle' },
    { objectId: '3', value: 'budgetTravel', label: 'Budget Travel' },
    { objectId: '4', value: 'travelPlanning', label: 'Travel Planning' },
    { objectId: '5', value: 'travelGuides', label: 'Travel Guides' },
    { objectId: '6', value: 'foodandDrink', label: 'Food and Drink' },
    { objectId: '7', value: 'gearAndTechnology', label: 'Gear and Technology' },
    { objectId: '8', value: 'culture', label: 'Culture' },
    { objectId: '9', value: 'travelPhotography', label: 'Travel Photography' },
]

// Options for continents
export const continentOptions = [
    { objectId: "mSxk54vkg6", label: "Asia", value: "Asia" },
    { objectId: "X2rEcTJnsE", label: "Africa", value: "Africa" },
    { objectId: "28HX8qDZHw", label: "Europe", value: "Europe" },
    { objectId: "E6LHZzkHr6", label: "Australia", value: "Australia" },
    { objectId: "xwS5b1G6tn", label: "Antarctica", value: "Antarctica" },
    { objectId: "vZNZcahFvu", label: "North America", value: "North America" },
    { objectId: "ISPUD93Or8", label: "South America", value: "South America" }
]



// For getting country by the name of continent
export const getCountry = ({ objId, setCountries, setIsLoading }) => {
    setIsLoading(true)
    const where = encodeURIComponent(JSON.stringify({
        "continent": {
            "__type": "Pointer",
            "className": "Continent",
            "objectId": objId
        }
    }));
    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://parseapi.back4app.com/classes/Country?order=name&keys=name,continent&where=${where}`,
                {
                    headers: {
                        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja',
                        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH',
                    }
                }
            );
            const data = await response.json();
            if (data?.results?.length > 0) {
                const mappedData = data.results.map(d => ({
                    objectId: d.objectId,
                    label: d.name,
                    value: d.name
                }));

                setCountries(mappedData);
                setIsLoading(false)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}

// For getting state by country
export const getState = ({ objId, setStates, setIsLoading }) => {
    setIsLoading(true)
    const where = encodeURIComponent(JSON.stringify({
        "country": {
            "__type": "Pointer",
            "className": "Country",
            "objectId": objId
        }
    }));
    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://parseapi.back4app.com/classes/Subdivisions_States_Provinces?order=Subdivision_Name&keys=Subdivision_Name&where=${where}`,
                {
                    headers: {
                        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja',
                        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH',
                    }
                }
            );
            const data = await response.json();
            if (data?.results?.length > 0) {
                const mappedData = data.results.map(d => ({
                    objectId: d.objectId,
                    label: d.Subdivision_Name,
                    value: d.Subdivision_Name
                }));
                setStates(mappedData);
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}



export const handleSaveContent = (content) => {
    localStorage.setItem('savedContent', JSON.stringify(content));
};
export const handleRemoveContent = () => {
    localStorage.removeItem('savedContent');
};
export const handleGetContent = () => {
    const localContent = localStorage.getItem('savedContent');
    return JSON.parse(localContent)
};


