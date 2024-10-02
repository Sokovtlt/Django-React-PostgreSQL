import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        details: [],
        title: '',
        channel: ''
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get('http://localhost:8000')
        .then(res => {
            this.setState({
                details: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            title: this.state.title,
            channel: this.state.channel
        };

        axios.post('http://localhost:8000', newEntry)
        .then(res => {
            this.fetchData();
            this.setState({
                title: '',
                channel: ''
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="p-4 max-w-lg mx-auto">
                <header className="text-2xl font-bold text-center">Data from Django</header>
                <hr className="my-4 border-t-2 border-gray-300" />

                <form onSubmit={this.handleFormSubmit} className="mb-4">
                    <div className="mb-2">
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            placeholder="Enter title"
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            name="channel"
                            value={this.state.channel}
                            onChange={this.handleInputChange}
                            placeholder="Enter channel"
                            required
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add Entry
                    </button>
                </form>

                <hr className="my-4 border-t-2 border-gray-300" />

                {this.state.details.length > 0 ? (
                    this.state.details.map((output, id) => (
                        <div key={id} className="mb-4 p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{output.title}</h2>
                            <p className="text-gray-600">{output.channel}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No data available</p>
                )}
            </div>
        );
    }
}

export default App;