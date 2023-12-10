const DataGrid = ({data}) => {
    return ( 
        <div className="data-grid">
            {data.map((object) => {
                return (
                    <div className={`data-grid-item${object.extended ? ' extended' : ''}${object.warning ? ' warning': object.good ? ' good' : ''}`} key={object.label}>
                        <p className="data-title">{object.label}</p>
                        <div>{object.value}</div>
                        {object.baseline && <p>Baseline: {object.baseline}</p>}
                    </div>
                    
                )
            })}
        </div>
     );
}

export const DataGridEngine = ({data, warning}) => {
    return ( 
        <div>

        <div className={`data-grid engine${warning ? ' warning' : ''}`}>
            {data.map((object) => {
                return (
                    <div className={`data-grid-item${object.extended ? ' extended' : ''}${object.warning ? ' warning': object.good ? ' good' : ''}`} key={object.label}>
                        <p className="data-title">{object.label}</p>
                        <div className={object.warning ? 'warning' : object.good ? 'good' : ''}>{object.value} %</div>
                        {object.baseline !== undefined && <p>Baseline: {object.baseline} %</p>}
                        <div className={`percentage-bars-container${object.warning ? ' warning' : ''}`}>
                        <div className="percentage-bar-container">
                            <div className="percentage-bar" style={{height: `${object.value}px`}}></div>
                        </div>
                        <div className="percentage-bar-container baseline">
                            <div className="percentage-bar" style={{height: `${object.baseline}px`}}></div>
                        </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <p className="warning-text">You might be running a number of engines that's unefficient</p>
        <p className="warning-text">Consider using only 2 engines</p>
            </div>

     );
}
 
export default DataGrid;