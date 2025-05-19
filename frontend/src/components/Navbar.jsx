import userStore from "../store/userStore";
import './Navbar.css'

export default function Navbar() {
    const { token } = userStore()

    return <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><i className="fa-solid fa-pen-nib"></i>&nbsp;BlogEditor</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/myBlog">My Blogs</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create">Create</a>
                    </li>
                    {!token && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Sign up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </>
                    )}
                    {token && (
                        <>
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={() => userStore.setState({ userData: {}, token: "" })}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
}