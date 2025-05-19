import useAlertStore from '../store/alertStore';

export default function Alert() {
    const { alert, clearAlert } = useAlertStore();

    if (!alert.message) return null;

    return (
        <div
            className={`alert alert-${alert.type} alert-dismissible fade show position-fixed top-20 start-50 translate-middle-x mt-3`}
            role="alert"
            style={{ zIndex: 1050, minWidth: '300px' }}
        >
            {alert.message}
            <button type="button" className="btn-close" aria-label="Close" onClick={clearAlert}></button>
        </div>
    );
}
