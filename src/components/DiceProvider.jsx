import React, { useState } from 'react'
import DiceRoll from "./DiceRoll.jsx"
import "./DiceProvider.css"
function DiceProvider() {
    const [selectedLimit, setSelectedLimit] = useState(10);
    const limitOptions = [10, 20, 30, 40, 50];

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setSelectedLimit(newLimit);
    };
    return (
        <>
        <div className='section'>
            <label htmlFor="gameLimit">Select Game Limit:</label>
            <select
                id="gameLimit"
                value={selectedLimit}
                onChange={handleLimitChange}
            >
                {limitOptions.map((limit) => (
                    <option key={limit} value={limit}>
                        {limit}
                    </option>
                ))}
            </select>
            </div>
            <p>Selected Game Limit: {selectedLimit}</p>

            <div><DiceRoll selectedLimit={selectedLimit} /></div>
        </>
    )
}

export default DiceProvider;