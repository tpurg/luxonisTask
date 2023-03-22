import "./navigation.css"

export const Navigation = () => {
    return (
        <div className="navigation">
            <div className="tab activeTab"><p className="tabContent">Home</p></div>
            <div className="tab"><p className="tabContent">Flats</p></div>
            <div className="tab"><p className="tabContent">Dummy tab 1</p></div>
        </div>
    );
}