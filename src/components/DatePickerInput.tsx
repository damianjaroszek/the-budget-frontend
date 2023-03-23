import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    updateForm: (key: string, value: string | number | Date | null) => void;
    propertyNameOfObjToSet: string;
}

export const DatePickerInput = ({updateForm, propertyNameOfObjToSet}: Props) => {
    const [startDate, setStartDate] = useState<null | Date>(new Date());


    useEffect(() => {
        updateForm(propertyNameOfObjToSet, startDate);
    }, [startDate])


    return (
        <DatePicker selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    withPortal
                    dateFormat="dd/MM/yyyy"
        />
    );
};
