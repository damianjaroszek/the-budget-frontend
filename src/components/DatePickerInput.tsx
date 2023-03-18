import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export const DatePickerInput = () => {
    const [startDate, setStartDate] = useState<null | Date>(new Date());
    return (
        <DatePicker selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    withPortal
                    dateFormat="dd/MM/yyyy"
        />
    );
};
