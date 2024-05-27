import React from 'react';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface PartnerSearchState {
    partnerUsers: User[];
    isLoading: boolean;
    error: string | null;
}
// Define types for the component's props if necessary
interface PartnerSearchProps {}

class PartnerSearch extends React.Component<PartnerSearchProps, PartnerSearchState> {
    constructor(props: PartnerSearchProps) {
        super(props);
        // Initialize state
        this.state = {
            partnerUsers: [],
            isLoading: false,  // Initially not loading
            error: null        // Initially no error
        };
    }

    fetchPartnerUsers = async () => {
        this.setState({ isLoading: true, error: null });
        try {
            const response = await fetch('http://localhost:8080/users/partners-search');
            if (!response.ok) {
                throw new Error(`Failed to fetch partner users! Status: ${response.status}`);
            }
            const partnerUsersData: User[] = await response.json();
            console.log("Fetched data:", partnerUsersData);  // Debugging line
            this.setState({ partnerUsers: partnerUsersData, isLoading: false });
        } catch (error: any) {
            console.error('Error fetching partner users:', error);  // More detailed error log
            this.setState({ error: error.message, isLoading: false });
        }
    };

    componentDidMount() {
        // Fetch partner users when the component mounts
        this.fetchPartnerUsers();
    }

    render() {
        const { partnerUsers, isLoading, error } = this.state;
    
        return (
            <div>
                <h1>Potential travel partners</h1>
                {isLoading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
                    <ul>
                        {partnerUsers.map((user, index) => (
                            <li key={index}>{user.firstName} {user.lastName} - {user.email}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default PartnerSearch;