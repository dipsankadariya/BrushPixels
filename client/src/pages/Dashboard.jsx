import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('/api/artwork/getuserart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch artworks');
                }

                const data = await response.json();
                setArtworks(data.userartworks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) {
        return <div>Loading artworks...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Your Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {artworks.length > 0 ? (
                    artworks.map((artwork) => (
                        <div key={artwork._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                            <img
                                src={artwork.imgUrl}
                                alt={artwork.imgTitle}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{artwork.imgTitle}</h3>
                                <p className="text-sm text-gray-600">{artwork.imgDescription}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No artworks found.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
