function Profile() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="avatar.jpg" alt="User Avatar" className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
                <p className="text-gray-600">Web Developer</p>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec justo urna.</p>
            </div>
        </div>
    );
}

export default Profile;