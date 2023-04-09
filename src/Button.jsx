export default function Button({ icon, func, style }) {
    return (
        <div className="btn" onClick={func} style={style}>
            <div className="btn-icon">
                {icon}
            </div>
        </div>
    )
};