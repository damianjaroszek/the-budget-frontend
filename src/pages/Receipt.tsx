import React from 'react';
import {Header} from "../components/Header";
import {Button as ButtonComponent} from "../components/Button"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import {DatePickerInput} from "../components/DatePickerInput";
import {InputAutocompleteField} from "../components/InputAutocompleteField";
import {InputField} from "../components/InputField";


interface Column {
    id: 'product' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'product', label: 'Product', minWidth: 170},
    {id: 'code', label: 'ISO\u00a0Code', minWidth: 100},
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    product: string;
    code: string;
    population: number;
    size: number;
    density: number;
}


function createData(
    product: string,
    code: string,
    population: number,
    size: number,
): Data {
    const density = population / size;
    return {product, code, population, size, density};
}

const rows = [
    createData('Bułka poranna', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),

];


export const Receipt = () => {

    // ----------------------------------------------- TABLE
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
            <Header category="page" title="Receipt"/>
            <div className="flex flex-wrap justify-center">
                <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl pb-6 mb-3">
                    <div className="mt-1 ">

                        <Paper sx={{width: '100%', overflow: 'hidden'}}>
                            <TableContainer sx={{maxHeight: 600}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{minWidth: column.minWidth}}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>

                <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                    <div className="flex justify-start">

                        <label>
                            <span className="text-gray-400">Pick expense date: </span>
                            <DatePickerInput/>
                        </label>
                    </div>

                    <div>
                        <form className="flex flex-wrap justify-start pt-5 pr-3">

                            <div className="pr-3 pb-3">
                                <InputAutocompleteField fieldName="Product" width={300}/>
                            </div>

                            <div className="pr-3 pb-3">
                                <InputField fieldName="Price" width={300} type="number"/>
                            </div>


                            <div className="pr-3 pb-3">
                                <InputAutocompleteField fieldName="Place" width={300}/>
                            </div>


                            <div className="pt-3 self-center">
                                <ButtonComponent color="white" bgColor="blue" text="Add" borderRadius="1px"/>
                            </div>
                        </form>
                    </div>


                </div>


            </div>

        </div>

    );
};
